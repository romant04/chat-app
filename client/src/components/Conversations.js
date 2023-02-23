import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";

export function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    onClick={() => selectConversationIndex(index)}
                    action
                    active={conversation.selected}
                >
                    {conversation.recipients.map((r) => r.name).join(", ")}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default Conversations;
