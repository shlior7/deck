import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useChannel, usePresence } from "@ably-labs/react-hooks";
import Table from '../../components/Table/Table';
import Cards from 'src/components/Cards/Cards';
import { TableWrapper } from 'src/components/Table/TableWrapper';
import GameBoard from 'src/components/GameBoard';

export default function Deck() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('demo');
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([]);

  const [players, updateName] = usePresence(code);

  const presentPlayers = players.map((msg, index) => (
    <li key={index}>
      {msg.data}
    </li>
  ));

  const messageList = messages.map((message, index) => {
    return <li key={index}>{message.text}</li>;
  });


  const [channel] = useChannel(code, (message) => {
    setMessages((messages) => [...messages, message.data]);
  });

  useEffect(() => {
    if (!router.isReady)
      return;
    const deckCode = router.query.code as string
    const myName = router.query?.name as string
    updateName(myName)
    console.log(myName)
    setCode(deckCode);
    setName(myName)
  }, [router.isReady])

  const sendMessage = () => {
    const message = { text: `${name} sent a message` };
    channel.publish("test-message", message);
  }

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
    },
    gameBoard: {
      flex: 1,
    },
  };

  return <div>
    <div style={{ flexDirection: 'column', ...styles.container }}>
      <h1>{name}</h1>
      <p>Deck Code: {code}</p>
      <ul>{presentPlayers}</ul>
      <ul>{messageList}</ul>
      <button onClick={sendMessage}></button>
      {/* <Table>
        <Cards cardsCodes={['back', 'back', 'back']} />
        <Cards cardsCodes={['back', 'back', 'back']} />
        <Cards cardsCodes={['back', 'back', 'back']} />
        <Cards cardsCodes={['back', 'back', 'back']} />
      </Table> */}
      <div style={styles.gameBoard}>
        <TableWrapper></TableWrapper>

      </div>
    </div>
  </div>
}

