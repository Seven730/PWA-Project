import React, { useState, useEffect } from "react";
import "./MyPhotosStyle.css";
import NavigationBar from "../../Components/NavigationBar";
import { Link } from "react-router-dom";
import UserAuthenticationHandler from "../../Handlers/UserAuthenticationHandler";
import RedirectHandler from "../../Handlers/RedirectHandler";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import ImageCardUploaded from "./ImageCardUploaded";
import { CardDeck } from "react-bootstrap";

export function MyPhotos() {
  const [user, setUser] = useState({});
  UserAuthenticationHandler.addListener((user) => setUser(user));
  if (!user) RedirectHandler.redirectToHome();

  const [urls, setUrls] = useState([]);
  const elem = [];
  const storage = firebase.storage();
  const downloadPhotos = () => {
    storage
      .ref(`${user.uid}/`)
      .listAll()
      .then(function (result) {
        result.items.forEach(function (imageRef) {
          elem.push(<ImageCardUploaded value={imageRef} user={user} />);
        });
        setUrls(elem);
      });
  };

  useEffect(() => {
    if (!urls.length) {
      downloadPhotos();
    }
  });

  return (
    <div>
      <NavigationBar />
      {!urls.length ? (
        <div>
          <h1 className="info">No images yet? Upload your first picture!</h1>
          <h1 className="info2">
            <Link className="info2" to="post">
              Click me :)
            </Link>
          </h1>
        </div>
      ) : (
        <CardDeck className="imageCardDeck">{urls}</CardDeck>
      )}
    </div>
  );
}
export const path = "/myPhotos";
