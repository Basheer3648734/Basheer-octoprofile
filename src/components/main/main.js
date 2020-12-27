/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import modules from "./main.module.css";
import GhPolyglot from "gh-polyglot";
import RepoCard from "../repo_card/repo_card";
import ProfileCard from "../profile-cards/profile_cards";
import OverviewCard from "../overview_cards/Overview_card";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";
import Modal from "../modal/Modal"
function main(props) {
  // const [imageUrl, setImageUrl] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [userName, setUserName] = useState({});
  const [forks, setForks] = useState(null);
  const [stars, setStars] = useState(null);
  const [language, setLanguage] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const { user } = useParams();
  const [error,setError]=useState(false)
  useEffect(() => {
    try{
    var me = new GhPolyglot(user);
    me.getAllRepos((err, res) => {
      if (err) {
        console.log(err);}
      else {
        // console.log(res);
        setUserName(res[0].owner);
      
        setRepositories(res);
        setForks(res.reduce((initial, res) => initial + res.forks_count, 0));
        setStars(
          res.reduce((initial, res) => initial + res.stargazers_count, 0)
        );
        let storage=JSON.parse(localStorage.getItem('searchHistory') )
        if(!storage){
            localStorage.setItem('searchHistory',JSON.stringify([{name:res[0].owner.login,avatar:res[0].owner.avatar_url}]))
        }
        const userExist=storage?.find(user=>(user.name===res[0].owner.login))
        if(!userExist){
        storage.push({name:res[0].owner.login,avatar:res[0].owner.avatar_url})
         localStorage.setItem('searchHistory',JSON.stringify(storage))
      }
    }
    });
    me.userStats((err, res) => {
      if (err) {
        console.log(err);
      } else {
        const top = res.sort((a, b) => (a.value < b.value ? 1 : -1));
        // console.log(top);
        setLanguage(top[0]);
      }
    });
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFollowers(data.followers);
        setFollowing(data.following);
      })}
      catch(e){
        setError(true)
      }
  }, [user]);
  // console.log(useParams());
  return (
    <div className={modules.main}>
      <div className={modules.main__profile}>
        {/* avatar ->image */}
        <img
          src={userName.avatar_url}
          alt="user"
          className={modules.profile__avatar}
        />
        {/* name ->link*/}
        <a href={userName.url} target="blank" className={modules.profile__name}>
          @{userName.login}
        </a>
        {/* three cards ->repositories followers following */}
        <div className={modules.profile__cards}>
          <ProfileCard count={repositories.length} label="REPOSITORIES" />
          <ProfileCard count={followers} label="FOLLOWERS" />
          <ProfileCard count={following} label="FOLLOWING" />
        </div>
        {/* {overview } */}
        <div className={modules.profile__overview}>
          <h3 className={modules.overview__header}>Overview</h3>
          <div className={modules.overview__container}>
            <OverviewCard main={language.label} label="Top language" />
            <OverviewCard main={forks} label="forks" />
            <OverviewCard main={stars} label="Stars" />
          </div>
        </div>
        {/* repositories */}
        <div className={modules.profile__repositories}>
          <h3 className={modules.repositories__header}>Repositories</h3>
          <div className={modules.repositories__container}>
            {repositories.map((repository) => (
              <RepoCard
                key={repository.id}
                url={repository.html_url}
                name={repository.name}
                description={repository.description}
                fork={repository.forks_count}
                star={repository.stargazers_count}
                size={repository.size}
              />
            ))}
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
      {error?(<modal>API limit exceeded! Try after sometime</modal>):null}
    </div>
  );
}

export default main;
