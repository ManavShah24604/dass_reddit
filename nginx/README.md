# DASS Assignement 1
## Name - Manav Devendrakumar Shah
## Roll Number - 2021101090

### Assumptions : 
- In Users in Sub Greddit Page in unblocked users simply the People array is displayed and on blocking user that user is removed from unblocked array and from people array, hence on blocking the person is removed from the subgreddit. But the user will always have an option to send join request again.
- Sorting based on joined button is done only when no other sorting is applied with it.
- Different page is shown in My Subgreddit and Subgreddit. Post functionality is given only in Subgreddit even to the moderator. 
- Banned Keywords are splitted with comma so if a word is found it is replace with *. A proper subset cannot be found through banned keywords.
- Tags should be entered comma seprated while entering as well as searching.
In Upvote and Downvote single people can upvote once only if he upvote again he would remove his original upvote. Similarly for Downvote also.
- In Followers and Following instead of User Name the email id of the users is displayed because as we were guided email id are distinct for each user and not User Name.


### For Starting the app :
- Frontend : npm start (`Runs on port 3000`)
- Backend : nodemon server.js (`Runs on port 7000`)

- For making docker image : `sudo docker-compose up` in parent directory
