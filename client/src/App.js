import React from "react";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
    const [id, setId] = useLocalStorage("id");

    const dashboard = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <Dashboard id={id} />
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    );

    return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
