// Firebase Configuration
// Your actual Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBdIADVjCsEMOb4Ek0UOcHfmkqL5hI_x7Q",
    authDomain: "anonchat-app-46eda.firebaseapp.com",
    projectId: "anonchat-app-46eda",
    storageBucket: "anonchat-app-46eda.firebasestorage.app",
    messagingSenderId: "872870716820",
    appId: "1:872870716820:web:89599886b291ee8b5cdb81",
    measurementId: "G-2J3DGTHLW3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.getFirestore(app);
const auth = firebase.getAuth(app);

// Real-time chat functionality
class FirebaseChat {
    constructor() {
        this.currentEnvironment = null;
        this.currentUser = null;
        this.messagesListener = null;
        this.usersListener = null;
        this.activeUsers = new Map();
    }

    // Join a chat environment
    async joinEnvironment(environmentId, username) {
        this.currentEnvironment = environmentId;
        this.currentUser = username;

        // Add user to active users
        await firebase.firestore.setDoc(
            firebase.firestore.doc(db, 'environments', environmentId, 'users', username),
            {
                username: username,
                joinedAt: firebase.firestore.serverTimestamp(),
                lastSeen: firebase.firestore.serverTimestamp()
            }
        );

        // Listen for messages in this environment
        this.listenForMessages(environmentId);
        
        // Listen for active users
        this.listenForActiveUsers(environmentId);

        // Add join message
        await this.addSystemMessage(`${username} joined the chat`, environmentId);
    }

    // Leave environment
    async leaveEnvironment() {
        if (this.currentEnvironment && this.currentUser) {
            // Remove user from active users
            await firebase.firestore.deleteDoc(
                firebase.firestore.doc(db, 'environments', this.currentEnvironment, 'users', this.currentUser)
            );

            // Stop listeners
            if (this.messagesListener) {
                this.messagesListener();
            }
            if (this.usersListener) {
                this.usersListener();
            }

            this.currentEnvironment = null;
            this.currentUser = null;
        }
    }

    // Send a real message
    async sendMessage(content) {
        if (!this.currentEnvironment || !this.currentUser) return;

        const message = {
            content: content,
            username: this.currentUser,
            timestamp: firebase.firestore.serverTimestamp(),
            environment: this.currentEnvironment
        };

        try {
            await firebase.firestore.addDoc(
                firebase.firestore.collection(db, 'environments', this.currentEnvironment, 'messages'),
                message
            );
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    // Listen for real messages
    listenForMessages(environmentId) {
        const messagesRef = firebase.firestore.collection(db, 'environments', environmentId, 'messages');
        const q = firebase.firestore.query(
            messagesRef,
            firebase.firestore.orderBy('timestamp', 'asc'),
            firebase.firestore.limit(50)
        );
        
        this.messagesListener = firebase.firestore.onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const message = {
                        id: change.doc.id,
                        ...change.doc.data()
                    };
                    this.displayMessage(message);
                }
            });
        }, (error) => {
            console.error('Error listening for messages:', error);
        });
    }

    // Listen for active users
    listenForActiveUsers(environmentId) {
        const usersRef = firebase.firestore.collection(db, 'environments', environmentId, 'users');
        
        this.usersListener = firebase.firestore.onSnapshot(usersRef, (snapshot) => {
            this.activeUsers.clear();
            snapshot.forEach((doc) => {
                this.activeUsers.set(doc.id, doc.data());
            });
            this.updateActiveUsersCount();
        });
    }

    // Add system message
    async addSystemMessage(content, environmentId) {
        const message = {
            content: content,
            username: 'System',
            timestamp: firebase.firestore.serverTimestamp(),
            environment: environmentId,
            isSystem: true
        };

        try {
            await firebase.firestore.addDoc(
                firebase.firestore.collection(db, 'environments', environmentId, 'messages'),
                message
            );
        } catch (error) {
            console.error('Error adding system message:', error);
        }
    }

    // Display message in UI
    displayMessage(message) {
        // This will be called by the main app
        if (window.chatApp && window.chatApp.addRealMessage) {
            window.chatApp.addRealMessage(message);
        }
    }

    // Update active users count
    updateActiveUsersCount() {
        const count = this.activeUsers.size;
        // Update UI with real user count
        if (window.chatApp && window.chatApp.updateActiveUsersCount) {
            window.chatApp.updateActiveUsersCount(count);
        }
    }

    // Get message history
    async getMessageHistory(environmentId, limit = 50) {
        try {
            const messagesRef = firebase.firestore.collection(db, 'environments', environmentId, 'messages');
            const q = firebase.firestore.query(
                messagesRef,
                firebase.firestore.orderBy('timestamp', 'desc'),
                firebase.firestore.limit(limit)
            );
            
            const snapshot = await firebase.firestore.getDocs(q);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).reverse();
        } catch (error) {
            console.error('Error getting message history:', error);
            return [];
        }
    }

    // Clean up old messages (keep only last 50)
    async cleanupOldMessages(environmentId) {
        try {
            const messagesRef = firebase.firestore.collection(db, 'environments', environmentId, 'messages');
            const q = firebase.firestore.query(
                messagesRef,
                firebase.firestore.orderBy('timestamp', 'desc'),
                firebase.firestore.offset(50)
            );
            
            const snapshot = await firebase.firestore.getDocs(q);
            const batch = firebase.firestore.writeBatch(db);
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        } catch (error) {
            console.error('Error cleaning up messages:', error);
        }
    }

    // Clean up entire environment (delete all messages and users)
    async cleanupEnvironment(environmentId) {
        try {
            console.log(`Cleaning up environment: ${environmentId}`);
            
            // Delete all messages
            const messagesRef = firebase.firestore.collection(db, 'environments', environmentId, 'messages');
            const messagesSnapshot = await firebase.firestore.getDocs(messagesRef);
            const messagesBatch = firebase.firestore.writeBatch(db);
            messagesSnapshot.docs.forEach((doc) => {
                messagesBatch.delete(doc.ref);
            });
            await messagesBatch.commit();
            
            // Delete all users
            const usersRef = firebase.firestore.collection(db, 'environments', environmentId, 'users');
            const usersSnapshot = await firebase.firestore.getDocs(usersRef);
            const usersBatch = firebase.firestore.writeBatch(db);
            usersSnapshot.docs.forEach((doc) => {
                usersBatch.delete(doc.ref);
            });
            await usersBatch.commit();
            
            console.log(`Environment ${environmentId} cleaned up successfully`);
        } catch (error) {
            console.error('Error cleaning up environment:', error);
        }
    }

    // Environment Management Methods
    async createEnvironment(environmentData) {
        try {
            const environment = {
                ...environmentData,
                createdAt: firebase.firestore.serverTimestamp(),
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                isCustom: true
            };

            const docRef = await firebase.firestore.addDoc(
                firebase.firestore.collection(db, 'environments'),
                environment
            );

            console.log('Environment created with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error creating environment:', error);
            throw error;
        }
    }

    async deleteEnvironment(environmentId) {
        try {
            // Delete the environment document
            await firebase.firestore.deleteDoc(
                firebase.firestore.doc(db, 'environments', environmentId)
            );

            // Clean up associated data
            await this.cleanupEnvironment(environmentId);
            
            console.log(`Environment ${environmentId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting environment:', error);
            throw error;
        }
    }

    async getEnvironments() {
        try {
            console.log('Getting environments from Firestore...');
            const environmentsRef = firebase.firestore.collection(db, 'environments');
            const snapshot = await firebase.firestore.getDocs(environmentsRef);
            
            console.log('Snapshot size:', snapshot.size);
            
            const environments = {};
            snapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Environment data:', doc.id, data);
                
                // Check if environment has expired
                if (data.expiresAt) {
                    const expiryDate = new Date(data.expiresAt.toDate());
                    const now = new Date();
                    console.log('Expiry check:', doc.id, 'expires:', expiryDate, 'now:', now, 'isExpired:', expiryDate < now);
                    
                    if (expiryDate > now) {
                        environments[doc.id] = {
                            ...data,
                            id: doc.id
                        };
                    }
                } else {
                    // If no expiry date, include it
                    environments[doc.id] = {
                        ...data,
                        id: doc.id
                    };
                }
            });
            
            console.log('Returning environments:', environments);
            return environments;
        } catch (error) {
            console.error('Error getting environments:', error);
            return {};
        }
    }

    listenForEnvironments(callback) {
        try {
            console.log('Setting up environments listener...');
            const environmentsRef = firebase.firestore.collection(db, 'environments');
            
            return firebase.firestore.onSnapshot(environmentsRef, (snapshot) => {
                console.log('Environments listener triggered, snapshot size:', snapshot.size);
                const environments = {};
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log('Listener - Environment data:', doc.id, data);
                    
                    // Check if environment has expired
                    if (data.expiresAt) {
                        const expiryDate = new Date(data.expiresAt.toDate());
                        const now = new Date();
                        console.log('Listener - Expiry check:', doc.id, 'expires:', expiryDate, 'now:', now, 'isExpired:', expiryDate < now);
                        
                        if (expiryDate > now) {
                            environments[doc.id] = {
                                ...data,
                                id: doc.id
                            };
                        }
                    } else {
                        // If no expiry date, include it
                        environments[doc.id] = {
                            ...data,
                            id: doc.id
                        };
                    }
                });
                
                console.log('Listener - Returning environments:', environments);
                callback(environments);
            });
        } catch (error) {
            console.error('Error listening for environments:', error);
        }
    }

    async cleanupExpiredEnvironments() {
        try {
            const environmentsRef = firebase.firestore.collection(db, 'environments');
            const snapshot = await firebase.firestore.getDocs(environmentsRef);
            
            const now = new Date();
            const batch = firebase.firestore.writeBatch(db);
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.expiresAt && new Date(data.expiresAt.toDate()) < now) {
                    batch.delete(doc.ref);
                    // Also clean up associated data
                    this.cleanupEnvironment(doc.id);
                }
            });
            
            await batch.commit();
            console.log('Expired environments cleaned up');
        } catch (error) {
            console.error('Error cleaning up expired environments:', error);
        }
    }
}

// Initialize Firebase Chat
try {
    const firebaseChat = new FirebaseChat();

    // Export for use in other files
    window.firebaseChat = firebaseChat;

    // Ensure it's available globally
    if (typeof window !== 'undefined') {
        window.firebaseChat = firebaseChat;
        console.log('Firebase Chat initialized successfully');
    }
} catch (error) {
    console.error('Error initializing Firebase Chat:', error);
    // Create a fallback Firebase chat object
    window.firebaseChat = {
        sendMessage: () => console.log('Firebase not available'),
        joinEnvironment: () => console.log('Firebase not available'),
        cleanupEnvironment: () => console.log('Firebase not available')
    };
} 