// firebase-config.js

// Firebase Configuration - Using the same config as AnonChat
const firebaseConfig = {
    apiKey: "AIzaSyBdIADVjCsEMOb4Ek0UOcHfmkqL5hI_x7Q",
    authDomain: "anonchat-app-46eda.firebaseapp.com",
    databaseURL: "https://anonchat-app-46eda-default-rtdb.firebaseio.com",
    projectId: "anonchat-app-46eda",
    storageBucket: "anonchat-app-46eda.firebasestorage.app",
    messagingSenderId: "872870716820",
    appId: "1:872870716820:web:89599886b291ee8b5cdb81",
    measurementId: "G-2J3DGTHLW3"
};

// Wait for Firebase to be available before initializing
function initializeFirebaseChat() {
    // Check if Firebase is available
    if (!window.firebase || !window.firebaseApp) {
        console.log('Firebase not ready yet, retrying in 100ms...');
        setTimeout(initializeFirebaseChat, 100);
        return;
    }

    console.log('Firebase is ready, initializing chat...');

    // Use the modular SDK functions from window.firebase
    const {
        getFirestore,
        collection,
        addDoc,
        onSnapshot,
        orderBy,
        limit,
        serverTimestamp,
        doc,
        setDoc,
        deleteDoc,
        query,
        getDocs,
        writeBatch
    } = window.firebase.firestore;

    // Use the app instance from window.firebaseApp (set in index.html)
    const db = getFirestore(window.firebaseApp);

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
            await setDoc(
                doc(db, 'environments', environmentId, 'users', username),
                {
                    username: username,
                    joinedAt: serverTimestamp(),
                    lastSeen: serverTimestamp()
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
                await deleteDoc(
                    doc(db, 'environments', this.currentEnvironment, 'users', this.currentUser)
                );

                // Stop listeners
                if (this.messagesListener) this.messagesListener();
                if (this.usersListener) this.usersListener();

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
                timestamp: serverTimestamp(),
                environment: this.currentEnvironment
            };

            try {
                await addDoc(
                    collection(db, 'environments', this.currentEnvironment, 'messages'),
                    message
                );
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }

        // Listen for real messages
        listenForMessages(environmentId) {
            const messagesRef = collection(db, 'environments', environmentId, 'messages');
            const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(50));
            if (this.messagesListener) this.messagesListener();
            this.messagesListener = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const message = change.doc.data();
                        if (window.chatApp && window.chatApp.addRealMessage) {
                            window.chatApp.addRealMessage(message);
                        }
                    }
                });
            });
        }

        // Listen for active users
        listenForActiveUsers(environmentId) {
            const usersRef = collection(db, 'environments', environmentId, 'users');
            if (this.usersListener) this.usersListener();
            this.usersListener = onSnapshot(usersRef, (snapshot) => {
                this.activeUsers.clear();
                snapshot.forEach((doc) => {
                    this.activeUsers.set(doc.id, doc.data());
                });
                if (window.chatApp && window.chatApp.updateActiveUsersCount) {
                    window.chatApp.updateActiveUsersCount(this.activeUsers.size);
                }
            });
        }

        // Add system message
        async addSystemMessage(content, environmentId) {
            const message = {
                content: content,
                username: 'System',
                timestamp: serverTimestamp(),
                environment: environmentId,
                isSystem: true
            };

            try {
                await addDoc(
                    collection(db, 'environments', environmentId, 'messages'),
                    message
                );
            } catch (error) {
                console.error('Error adding system message:', error);
            }
        }

        // Clean up old messages (keep only last 50)
        async cleanupOldMessages(environmentId) {
            try {
                const messagesRef = collection(db, 'environments', environmentId, 'messages');
                const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));
                const snapshot = await getDocs(q);
                const batch = writeBatch(db);
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
                // Delete all messages
                const messagesRef = collection(db, 'environments', environmentId, 'messages');
                const messagesSnapshot = await getDocs(messagesRef);
                const messagesBatch = writeBatch(db);
                messagesSnapshot.docs.forEach((doc) => {
                    messagesBatch.delete(doc.ref);
                });
                await messagesBatch.commit();

                // Delete all users
                const usersRef = collection(db, 'environments', environmentId, 'users');
                const usersSnapshot = await getDocs(usersRef);
                const usersBatch = writeBatch(db);
                usersSnapshot.docs.forEach((doc) => {
                    usersBatch.delete(doc.ref);
                });
                await usersBatch.commit();
            } catch (error) {
                console.error('Error cleaning up environment:', error);
            }
        }

        // --- SHARED ENVIRONMENT METHODS ---

        async createEnvironment(environmentData) {
            try {
                const environment = {
                    ...environmentData,
                    createdAt: serverTimestamp(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                    isCustom: true
                };
                const docRef = await addDoc(collection(db, 'environments'), environment);
                return docRef.id;
            } catch (error) {
                console.error('Error creating environment:', error);
                throw error;
            }
        }

        async deleteEnvironment(environmentId) {
            try {
                await deleteDoc(doc(db, 'environments', environmentId));
                await this.cleanupEnvironment(environmentId);
            } catch (error) {
                console.error('Error deleting environment:', error);
                throw error;
            }
        }

        async getEnvironments() {
            try {
                const environmentsRef = collection(db, 'environments');
                const snapshot = await getDocs(environmentsRef);
                const environments = {};
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.expiresAt) {
                        const expiryDate = new Date(data.expiresAt.toDate ? data.expiresAt.toDate() : data.expiresAt);
                        if (expiryDate > new Date()) {
                            environments[docSnap.id] = { ...data, id: docSnap.id };
                        }
                    } else {
                        environments[docSnap.id] = { ...data, id: docSnap.id };
                    }
                });
                return environments;
            } catch (error) {
                console.error('Error getting environments:', error);
                return {};
            }
        }

        listenForEnvironments(callback) {
            try {
                const environmentsRef = collection(db, 'environments');
                return onSnapshot(environmentsRef, (snapshot) => {
                    const environments = {};
                    snapshot.forEach((docSnap) => {
                        const data = docSnap.data();
                        if (data.expiresAt) {
                            const expiryDate = new Date(data.expiresAt.toDate ? data.expiresAt.toDate() : data.expiresAt);
                            if (expiryDate > new Date()) {
                                environments[docSnap.id] = { ...data, id: docSnap.id };
                            }
                        } else {
                            environments[docSnap.id] = { ...data, id: docSnap.id };
                        }
                    });
                    callback(environments);
                });
            } catch (error) {
                console.error('Error listening for environments:', error);
            }
        }

        async cleanupExpiredEnvironments() {
            try {
                const environmentsRef = collection(db, 'environments');
                const snapshot = await getDocs(environmentsRef);
                const now = new Date();
                const batch = writeBatch(db);
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.expiresAt) {
                        const expiryDate = new Date(data.expiresAt.toDate ? data.expiresAt.toDate() : data.expiresAt);
                        if (expiryDate < now) {
                            batch.delete(docSnap.ref);
                            this.cleanupEnvironment(docSnap.id);
                        }
                    }
                });
                await batch.commit();
            } catch (error) {
                console.error('Error cleaning up expired environments:', error);
            }
        }
    }

    // Export for use in other files
    window.firebaseChat = new FirebaseChat();
    console.log('Firebase Chat initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFirebaseChat);
} else {
    initializeFirebaseChat();
} 