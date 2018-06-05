import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../services/login/login.service";
import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from "../../domain/Profile";
import { Tweet } from "../../domain/Tweet";
import { TimelineService } from "../../services/timeline/timeline.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile: Profile
    loginProfile: Profile
    
    followButtonText: string
    followButtonState: boolean
    followState: boolean
    followProfile: Profile

    followersFetched: Array<Profile>
    followingFetched: Array<Profile>

    followerCount: number
    followingCount: number
    tweetCount: number

    // Paging and tweets
    p: number = 1;
    allTweets: Array<Tweet>;

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private timelineService: TimelineService){}

    ngOnInit(){
        const usernameUrl = this.route.snapshot.paramMap.get("username");

        this.profile = new Profile()
        this.loginProfile = new Profile()
        this.followState = false;
        
        this.logic()

        this.getProfile(usernameUrl)
        

    }

    getProfile(username: string){
        this.profileService.getProfileByName(username).subscribe(response => {
            this.profile = response['response'] as Profile
            
            this.getFollowersById(this.profile.id)
            this.getFollowingById(this.profile.id)
            this.getProfileTweets(this.profile.id)
        })
    }

    getProfileTweets(id: string){
        this.timelineService.getProfileTweets(id).subscribe(response => {
            this.allTweets = response['response'] as Array<Tweet>
            this.tweetCount = this.allTweets.length
        })
    }

    getProfileByToken(token: string){
        this.profileService.getProfileByToken(token).subscribe(response => {
            this.loginProfile = response['response'] as Profile
        })
    }

    followAction(){
        if(this.followButtonText == "Follow") { 
            this.profileService.followProfile(localStorage.getItem("token"), this.profile.id).subscribe(response => {
                this.followButtonText = "Unfollow"
                location.reload()
            })
        } else {
            this.profileService.unfollowProfile(localStorage.getItem("token"), this.profile.id).subscribe(response => {
                this.followButtonText = "Follow"
                location.reload()
            })
        }
    }

    getFollowersById(id: string) {
        this.profileService.getFollowersById(id).subscribe(response => {
            this.followersFetched = response['response'] as Array<Profile>
            this.followerCount = this.followersFetched.length
        });
    }

    getFollowingById(id: string) {
        this.profileService.getFollowingById(id).subscribe(response => {
            this.followingFetched = response['response'] as Array<Profile>
            this.followingCount = this.followingFetched.length
        })
    }
    

    logic() {
        if(localStorage.getItem("token")){
            if(this.profile.id == this.loginProfile.id) {
                this.followButtonText = "Disabled"
                this.followButtonState = false

            }
            this.followState = true;
            this.followButtonText = 'Follow'
            this.getProfileByToken(localStorage.getItem("token"))

        } else {
            this.followState = false;
        }
    }

    buttonState(): boolean{

        if(localStorage.getItem("token")){
            if(this.profile.id == this.loginProfile.id){
                this.followButtonText = "Disabled"
                return false
            } else {
                this.followButton()
                return true
            }
        } else {
            this.followButtonText="Disabled"
            return false
        }
    }

    followButton(){
        var profile = this.followersFetched.find(f => f.id == this.loginProfile.id)
        var isNotFollowing = (profile == undefined)
        if(isNotFollowing) {
            this.followButtonText = "Follow"
        } else {
            this.followButtonText = "Unfollow"
        }
    }

}