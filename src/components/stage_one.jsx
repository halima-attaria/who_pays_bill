import { useState, useContext, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { MyContext } from "../context";

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        
        if (!value.trim()) {
            setError('Sorry, you need to add something');
            return;
        }
        
        if (value.trim().length <= 2) {
            setError('Sorry, you need at least 3 characters');
            return;
        }
        
        context.addPlayer(value);
        textInput.current.value = '';
        setError('');
        console.log(value);
    }
    
    return( 
        <>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Add player name"
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                <Button className="miami" variant="primary" type="submit">
                    Add player
                </Button>
                {context.players && context.players.length > 0 ? <>
                    <hr/>
                    <div>
                        <ul className="list-group">
                            {context.players.map((player, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                    {player}
                                    <span 
                                        className="badge badge-danger " 
                                        onClick={() => context.removePlayer(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        x
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* FIXED: Changed from context.context() to context.next() */}
                    <div className="action_button"
                    onClick={() => context.next()}
                    
                    >Next</div>
                </> : null}
            </Form>
        </>
    )
}

export default Stage1;