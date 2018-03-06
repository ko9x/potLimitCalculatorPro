#Major Design Change (well pretty major)
* I want to make a player object that includes
    * name
    * bet
    * status
* I am pretty sure this is the correct way to go but I should make a new branch just in case
    


#Things to do
* Add Bet Tracking to the player tracker
    * include the current bet a player has made in the players tracker bar
    * we need to skip the action to the next player wether the previous player checked, called, or folded
    * there needs to be an option to complete the bet. So it needs to know the current bet and the players bet
    * the logic needs to keep track of who is currently in the hand and who has folded
* Add hand tracking logic to the bet/player tracker
    * the logic needs to know once a round of betting (such as the flop) is over and reset the correct properties etc...
* I need to do a little styling to the main content to get rid of the gap under the lower bet displays.
* Merge the sean and master branches once I am at a good spot and I am confident I can merge them correctly
* And probably a bunch more that I am forgetting at the moment