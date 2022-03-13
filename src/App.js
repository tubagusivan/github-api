import { useEffect, useState } from "react";
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGithubUsername] = useState();
  const [repoData, setRepoData] = useState();

  async function repoDataURL() {
    await fetch("https://api.github.com/users/tubagusivan/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(36, result);
          const list = result.map((item) => (
            <div className="text-center">
              <a target="_blank" rel="noreferrer" href={item.svn_url}>
                {item.name}
              </a>
            </div>
          ));
          setRepoData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    fetch("https://api.github.com/users/tubagusivan")
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        setAvatarURL(result.avatar_url);
        setGithubUsername(result.login);
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          <Card.Title>{githubUsername}</Card.Title>

          <Button variant="primary" onClick={repoDataURL}>
            List Tubagus Ivan's Repos!
          </Button>
        </Card.Body>
      </Card>
      {repoData}
    </div>
  );
}

export default App;
