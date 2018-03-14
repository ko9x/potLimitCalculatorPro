# Done
* I want to make a player object that includes
    * name
    * bet
    * status
* Add Bet Tracking to the player tracker
    * include the current bet a player has made in the players tracker bar
    * we need to skip the action to the next player wether the previous player checked, called, or folded
    * there needs to be an option to complete the bet. So it needs to know the current bet and the players bet
    * I need to do a little styling to the main content to get rid of the gap under the lower bet displays.
* fix the logic needs to keep track of who is currently in the hand and who has folded
    * checkBettingRoundStatus is the function that is not working properly
* Add hand tracking logic to the bet/player tracker
    * the logic needs to know once a round of betting (such as the flop) is over and reset the correct properties etc...
* Currently if there are 2 open spots in the middle of the table, the one closer to the top must be filled.
    * otherwise the tracking breaks.
    * this could be fixed by having all the players in the players array at all times
    * and creating a new property of the player object 
        * instead of status = active or inactive
            * atTable = true or false 
            * inHand = true or false
    * this would require another array to be created because currently the dealer follows the players array
        * the dealer would now need to follow the atTable array
        * the action would follow the inHand array

# Things to do  
* Dry up the code and figure out how to get this bitch on the app store