import {Component, OnInit} from '@angular/core'
import { TimelineService } from '../../services/timeline/timeline.service';
import { ProfileService } from '../../services/profile/profile.service';
import { RoutingService } from '../../services/routing/routing.service';
import { Tweet } from "../../domain/Tweet";
import { Profile } from "../../domain/Profile";
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
    selector: 'timeline-component',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{

    // Paging and tweets
    p: number = 1;
    allTweets: Array<Tweet>;

    //Posting new tweets
    tweetText: string;

    //Profiling
    loginButtonText: string;
    loginState: boolean;
    profile: Profile;
    username: string;
    bio: string;
    website: string;

    
    constructor(private timelineService: TimelineService, 
        private profileService: ProfileService,
        private websocketService: WebsocketService,
        private routingService: RoutingService){
    }

    ngOnInit(){

        this.profile = null;
        this.tweetText = "";
        this.username = "";
        this.bio = "";
        this.website = "";

        this.isLoggedIn()

    }

    initWebsocket(id: String) {
        this.websocketService.createObservableSocket(id).subscribe(data => {
            this.socketReceived(JSON.parse(data.toString()) as Tweet)
        })
    }

    getTimelineTweets(): any{
        this.timelineService.getAllTweets().subscribe(response => {
            this.allTweets = response['response'] as Array<Tweet>
        })
    }

    getPersonalizedTimelineTweets(id: string) {
        this.timelineService.getAllPersonalizedTweets(id).subscribe(response => {
            this.allTweets = response['response'] as Array<Tweet>
        })
    }

    postTweet() {
        if(this.tweetText != ""){
            this.timelineService.postTweet(this.tweetText, localStorage.getItem("token")).subscribe(response => {
                this.tweetText = ""
                this.allTweets.unshift(response['response'] as Tweet)
            })
        } 
    }

    socketReceived(tweet: Tweet) {
        this.allTweets.unshift(tweet);
    }

    loginButtonClick(){
        if(this.loginState){
            localStorage.clear()
            this.routingService.openLogin()
        } else {
            this.routingService.openLogin()
        }
    }

    isLoggedIn() {
        if(localStorage.getItem("token")){
            this.loginState = true;
            this.loginButtonText = "Logout"
            this.profileService.getProfileByToken(localStorage.getItem("token")).subscribe(response => {
                this.profile = response['response'] as Profile
                this.username = this.profile.username
                this.bio = this.profile.bio
                this.website = this.profile.website
                this.getPersonalizedTimelineTweets(this.profile.id)
                this.initWebsocket(this.profile.id)
            })

        } else {
            this.loginState = false;
            this.loginButtonText = "Login"
            this.getTimelineTweets()
        }
    }

    formatDate(date: number){
        var tweetDate = new Date(date);
        var dateString = tweetDate.getHours() + ":" + tweetDate.getMinutes() + " " + tweetDate.getDay() + "/" + tweetDate.getMonth() + "/" + tweetDate.getFullYear()
        
        return dateString;
        
    }

    

}