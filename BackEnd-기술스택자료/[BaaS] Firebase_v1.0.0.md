# [BaaS] Firebase

![슬라이드1](https://user-images.githubusercontent.com/70404643/105113194-cf8daf80-5b07-11eb-8017-2f6a6c89214a.PNG)

## 시작하기

---

### 웹 앱에 Firebase 추가

1. 앱등록

<img src="https://user-images.githubusercontent.com/70404643/105140120-9de20c00-5b3a-11eb-992a-cb66cc329dba.png" alt="image" style="zoom:67%;" />

2. Firebase SDK 추가

   ```javascript
   <!-- The core Firebase JS SDK is always required and must be listed first -->
   <script src="/__/firebase/8.2.3/firebase-app.js"></script>
   
   <!-- TODO: Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->
   <script src="/__/firebase/8.2.3/firebase-analytics.js"></script>
   
   <!-- Initialize Firebase -->
   <script src="/__/firebase/init.js"></script>
   ```

3. FirebaseCLI 설치

   ```
   $ npm install -g firebase-tools
   ```

4. Firebase 호스팅에 배포
   지금 또는 나중에 배포할 수 있다. 지금 배포하려면 터미널 창을 열어 웹 앱의 루트 디렐토리로 이동하거나 루트 디렉토리를 생성
   Google에 로그인

   ```
   $ firebase login
   ```

   프로젝트 시작
   앱의 루트 디렉터리에서 다음 명령어를 실행

   ```
   $ firebase init
   ```

   준비되면 웹 앱 배포
   정적파일(예:HTML, CSS, JS)을 앱의 배포 디렉터리에 넣으시오. 기본값은 공개. 그런다음 앱의 루트 디렉터리에서 명령어 입력

   ```
   $ firebase deploy
   ```

   배포 후 [plover-911b4.web.app](plover-911b4.web.app) 에서 앱을 확인.



## 인증서비스 조사

---

```java
package com.google.firebase.quickstart;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.auth.UserRecord.UpdateRequest;
import com.google.firebase.database.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Auth snippets for documentation.
 *
 * See:
 * https://firebase.google.com/docs/auth/admin
 */
public class AuthSnippets {

  public static void getUserById(String uid) throws InterruptedException, ExecutionException {
    // [START get_user_by_id]
    UserRecord userRecord = FirebaseAuth.getInstance().getUserAsync(uid).get();
    // See the UserRecord reference doc for the contents of userRecord.
    System.out.println("Successfully fetched user data: " + userRecord.getUid());
    // [END get_user_by_id]
  }

  public static void getUserByEmail(String email) throws InterruptedException, ExecutionException {
    // [START get_user_by_email]
    UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmailAsync(email).get();
    // See the UserRecord reference doc for the contents of userRecord.
    System.out.println("Successfully fetched user data: " + userRecord.getEmail());
    // [END get_user_by_email]
  }

  public static void getUserByPhoneNumber(
      String phoneNumber) throws InterruptedException, ExecutionException {
    // [START get_user_by_phone]
    UserRecord userRecord = FirebaseAuth.getInstance().getUserByPhoneNumberAsync(phoneNumber).get();
    // See the UserRecord reference doc for the contents of userRecord.
    System.out.println("Successfully fetched user data: " + userRecord.getPhoneNumber());
    // [END get_user_by_phone]
  }

  public static void createUser() throws InterruptedException, ExecutionException {
    // [START create_user]
    CreateRequest request = new CreateRequest()
        .setEmail("user@example.com")
        .setEmailVerified(false)
        .setPassword("secretPassword")
        .setPhoneNumber("+11234567890")
        .setDisplayName("John Doe")
        .setPhotoUrl("http://www.example.com/12345678/photo.png")
        .setDisabled(false);

    UserRecord userRecord = FirebaseAuth.getInstance().createUserAsync(request).get();
    System.out.println("Successfully created new user: " + userRecord.getUid());
    // [END create_user]
  }

  public static void createUserWithUid() throws InterruptedException, ExecutionException {
    // [START create_user_with_uid]
    CreateRequest request = new CreateRequest()
        .setUid("some-uid")
        .setEmail("user@example.com")
        .setPhoneNumber("+11234567890");

    UserRecord userRecord = FirebaseAuth.getInstance().createUserAsync(request).get();
    System.out.println("Successfully created new user: " + userRecord.getUid());
    // [END create_user_with_uid]
  }

  public static void updateUser(String uid) throws InterruptedException, ExecutionException {
    // [START update_user]
    UpdateRequest request = new UpdateRequest(uid)
        .setEmail("user@example.com")
        .setPhoneNumber("+11234567890")
        .setEmailVerified(true)
        .setPassword("newPassword")
        .setDisplayName("Jane Doe")
        .setPhotoUrl("http://www.example.com/12345678/photo.png")
        .setDisabled(true);

    UserRecord userRecord = FirebaseAuth.getInstance().updateUserAsync(request).get();
    System.out.println("Successfully updated user: " + userRecord.getUid());
    // [END update_user]
  }

  public static void setCustomUserClaims(
      String uid) throws InterruptedException, ExecutionException {
    // [START set_custom_user_claims]
    // Set admin privilege on the user corresponding to uid.
    Map<String, Object> claims = new HashMap<>();
    claims.put("admin", true);
    FirebaseAuth.getInstance().setCustomUserClaimsAsync(uid, claims).get();
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
    // [END set_custom_user_claims]

    String idToken = "id_token";
    // [START verify_custom_claims]
    // Verify the ID token first.
    FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken).get();
    if (Boolean.TRUE.equals(decoded.getClaims().get("admin"))) {
      // Allow access to requested admin resource.
    }
    // [END verify_custom_claims]

    // [START read_custom_user_claims]
    // Lookup the user associated with the specified uid.
    UserRecord user = FirebaseAuth.getInstance().getUserAsync(uid).get();
    System.out.println(user.getCustomClaims().get("admin"));
    // [END read_custom_user_claims]
  }

  public static void setCustomUserClaimsScript() throws InterruptedException, ExecutionException {
    // [START set_custom_user_claims_script]
    UserRecord user = FirebaseAuth.getInstance()
        .getUserByEmailAsync("user@admin.example.com").get();
    // Confirm user is verified.
    if (user.isEmailVerified()) {
      Map<String, Object> claims = new HashMap<>();
      claims.put("admin", true);
      FirebaseAuth.getInstance().setCustomUserClaimsAsync(user.getUid(), claims).get();
    }
    // [END set_custom_user_claims_script]
  }

  public static void setCustomUserClaimsInc() throws InterruptedException, ExecutionException {
    // [START set_custom_user_claims_incremental]
    UserRecord user = FirebaseAuth.getInstance()
        .getUserByEmailAsync("user@admin.example.com").get();
    // Add incremental custom claim without overwriting the existing claims.
    Map<String, Object> currentClaims = user.getCustomClaims();
    if (Boolean.TRUE.equals(currentClaims.get("admin"))) {
      // Add level.
      currentClaims.put("level", 10);
      // Add custom claims for additional privileges.
      FirebaseAuth.getInstance().setCustomUserClaimsAsync(user.getUid(), currentClaims).get();
    }
    // [END set_custom_user_claims_incremental]
  }

  public static void listAllUsers() throws InterruptedException, ExecutionException  {
    // [START list_all_users]
    // Start listing users from the beginning, 1000 at a time.
    ListUsersPage page = FirebaseAuth.getInstance().listUsersAsync(null).get();
    while (page != null) {
      for (ExportedUserRecord user : page.getValues()) {
        System.out.println("User: " + user.getUid());
      }
      page = page.getNextPage();
    }

    // Iterate through all users. This will still retrieve users in batches,
    // buffering no more than 1000 users in memory at a time.
    page = FirebaseAuth.getInstance().listUsersAsync(null).get();
    for (ExportedUserRecord user : page.iterateAll()) {
      System.out.println("User: " + user.getUid());
    }
    // [END list_all_users]
  }

  public static void deleteUser(String uid) throws InterruptedException, ExecutionException {
    // [START delete_user]
    FirebaseAuth.getInstance().deleteUserAsync(uid).get();
    System.out.println("Successfully deleted user.");
    // [END delete_user]
  }

  public static void createCustomToken() throws InterruptedException, ExecutionException {
    // [START custom_token]
    String uid = "some-uid";

    String customToken = FirebaseAuth.getInstance().createCustomTokenAsync(uid).get();
    // Send token back to client
    // [END custom_token]
    System.out.println("Created custom token: " + customToken);
  }

  public static void createCustomTokenWithClaims() throws InterruptedException, ExecutionException {
    // [START custom_token_with_claims]
    String uid = "some-uid";
    Map<String, Object> additionalClaims = new HashMap<String, Object>();
    additionalClaims.put("premiumAccount", true);

    String customToken = FirebaseAuth.getInstance()
        .createCustomTokenAsync(uid, additionalClaims).get();
    // Send token back to client
    // [END custom_token_with_claims]
    System.out.println("Created custom token: " + customToken);
  }

  public static void verifyIdToken(String idToken) throws InterruptedException, ExecutionException {
    // [START verify_id_token]
    // idToken comes from the client app (shown above)
    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken).get();
    String uid = decodedToken.getUid();
    // [END verify_id_token]
    System.out.println("Decoded ID token from user: " + uid);
  }

  public static void verifyIdTokenCheckRevoked(String idToken) throws InterruptedException, ExecutionException {
    // [START verify_id_token_check_revoked]
    try {
      // Verify the ID token while checking if the token is revoked by passing checkRevoked
      // as true.
      boolean checkRevoked = true;
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken, checkRevoked).get();
      // Token is valid and not revoked.
      String uid = decodedToken.getUid();
    } catch (ExecutionException e) {
      if (e.getCause() instanceof FirebaseAuthException) {
        FirebaseAuthException authError = (FirebaseAuthException) e.getCause();
        if (authError.getErrorCode().equals("id-token-revoked")) {
          // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
        } else {
          // Token is invalid.
        }
      }
    }
    // [END verify_id_token_check_revoked]
  }

  public static void revokeIdTokens(String idToken) throws InterruptedException, ExecutionException { 
    String uid="someUid";
    // [START revoke_tokens]
    FirebaseAuth.getInstance().revokeRefreshTokensAsync(uid).get();
    UserRecord user = FirebaseAuth.getInstance().getUserAsync(uid).get();
    // Convert to seconds as the auth_time in the token claims is in seconds too. 
    long revocationSecond = user.getTokensValidAfterTimestamp() / 1000;
    System.out.println("Tokens revoked at: " + revocationSecond);
    // [END revoke_tokens]

    // [START save_revocation_in_db]
    DatabaseReference ref = FirebaseDatabase.getInstance().getReference("metadata/" + uid);
    Map<String, Object> userData = new HashMap<>();
    userData.put("revokeTime", revocationSecond);
    ref.setValueAsync(userData).get();
    // [END save_revocation_in_db]
    
  }

  public static void main(String[] args) throws InterruptedException, ExecutionException {
    System.out.println("Hello, AuthSnippets!");

    // Initialize Firebase
    try {
      // [START initialize]
      FileInputStream serviceAccount = new FileInputStream("service-account.json");
      FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();
      FirebaseApp.initializeApp(options);
      // [END initialize]
    } catch (IOException e) {
      System.out.println("ERROR: invalid service account credentials. See README.");
      System.out.println(e.getMessage());

      System.exit(1);
    }

    // Smoke test
    createUserWithUid();
    getUserById("some-uid");
    getUserByEmail("user@example.com");
    getUserByPhoneNumber("+11234567890");
    updateUser("some-uid");
    //setCustomUserClaims("some-uid");
    listAllUsers();
    deleteUser("some-uid");
    createCustomToken();
    createCustomTokenWithClaims();
    System.out.println("Done!");
  }

}

```



## FCM(Firebase Cloud Message) 서비스 조사

---

```java
package com.google.firebase.quickstart;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Scanner;

/**
 * Firebase Cloud Messaging (FCM) can be used to send messages to clients on iOS, Android and Web.
 *
 * This sample uses FCM to send two types of messages to clients that are subscribed to the `news`
 * topic. One type of message is a simple notification message (display message). The other is
 * a notification message (display notification) with platform specific customizations, for example,
 * a badge is added to messages that are sent to iOS devices.
 */
public class Messaging {

  private static final String PROJECT_ID = "<YOUR-PROJECT-ID>";
  private static final String BASE_URL = "https://fcm.googleapis.com";
  private static final String FCM_SEND_ENDPOINT = "/v1/projects/" + PROJECT_ID + "/messages:send";

  private static final String MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
  private static final String[] SCOPES = { MESSAGING_SCOPE };

  private static final String TITLE = "FCM Notification";
  private static final String BODY = "Notification from FCM";
  public static final String MESSAGE_KEY = "message";

  /**
   * Retrieve a valid access token that can be use to authorize requests to the FCM REST
   * API.
   *
   * @return Access token.
   * @throws IOException
   */
  // [START retrieve_access_token]
  private static String getAccessToken() throws IOException {
    GoogleCredential googleCredential = GoogleCredential
        .fromStream(new FileInputStream("service-account.json"))
        .createScoped(Arrays.asList(SCOPES));
    googleCredential.refreshToken();
    return googleCredential.getAccessToken();
  }
  // [END retrieve_access_token]

  /**
   * Create HttpURLConnection that can be used for both retrieving and publishing.
   *
   * @return Base HttpURLConnection.
   * @throws IOException
   */
  private static HttpURLConnection getConnection() throws IOException {
    // [START use_access_token]
    URL url = new URL(BASE_URL + FCM_SEND_ENDPOINT);
    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
    httpURLConnection.setRequestProperty("Authorization", "Bearer " + getAccessToken());
    httpURLConnection.setRequestProperty("Content-Type", "application/json; UTF-8");
    return httpURLConnection;
    // [END use_access_token]
  }

  /**
   * Send request to FCM message using HTTP.
   *
   * @param fcmMessage Body of the HTTP request.
   * @throws IOException
   */
  private static void sendMessage(JsonObject fcmMessage) throws IOException {
    HttpURLConnection connection = getConnection();
    connection.setDoOutput(true);
    DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
    outputStream.writeBytes(fcmMessage.toString());
    outputStream.flush();
    outputStream.close();

    int responseCode = connection.getResponseCode();
    if (responseCode == 200) {
      String response = inputstreamToString(connection.getInputStream());
      System.out.println("Message sent to Firebase for delivery, response:");
      System.out.println(response);
    } else {
      System.out.println("Unable to send message to Firebase:");
      String response = inputstreamToString(connection.getErrorStream());
      System.out.println(response);
    }
  }

  /**
   * Send a message that uses the common FCM fields to send a notification message to all
   * platforms. Also platform specific overrides are used to customize how the message is
   * received on Android and iOS.
   *
   * @throws IOException
   */
  private static void sendOverrideMessage() throws IOException {
    JsonObject overrideMessage = buildOverrideMessage();
    System.out.println("FCM request body for override message:");
    prettyPrint(overrideMessage);
    sendMessage(overrideMessage);
  }

  /**
   * Build the body of an FCM request. This body defines the common notification object
   * as well as platform specific customizations using the android and apns objects.
   *
   * @return JSON representation of the FCM request body.
   */
  private static JsonObject buildOverrideMessage() {
    JsonObject jNotificationMessage = buildNotificationMessage();

    JsonObject messagePayload = jNotificationMessage.get(MESSAGE_KEY).getAsJsonObject();
    messagePayload.add("android", buildAndroidOverridePayload());

    JsonObject apnsPayload = new JsonObject();
    apnsPayload.add("headers", buildApnsHeadersOverridePayload());
    apnsPayload.add("payload", buildApsOverridePayload());

    messagePayload.add("apns", apnsPayload);

    jNotificationMessage.add(MESSAGE_KEY, messagePayload);

    return jNotificationMessage;
  }

  /**
   * Build the android payload that will customize how a message is received on Android.
   *
   * @return android payload of an FCM request.
   */
  private static JsonObject buildAndroidOverridePayload() {
    JsonObject androidNotification = new JsonObject();
    androidNotification.addProperty("click_action", "android.intent.action.MAIN");

    JsonObject androidNotificationPayload = new JsonObject();
    androidNotificationPayload.add("notification", androidNotification);

    return androidNotificationPayload;
  }

  /**
   * Build the apns payload that will customize how a message is received on iOS.
   *
   * @return apns payload of an FCM request.
   */
  private static JsonObject buildApnsHeadersOverridePayload() {
    JsonObject apnsHeaders = new JsonObject();
    apnsHeaders.addProperty("apns-priority", "10");

    return apnsHeaders;
  }

  /**
   * Build aps payload that will add a badge field to the message being sent to
   * iOS devices.
   *
   * @return JSON object with aps payload defined.
   */
  private static JsonObject buildApsOverridePayload() {
    JsonObject badgePayload = new JsonObject();
    badgePayload.addProperty("badge", 1);

    JsonObject apsPayload = new JsonObject();
    apsPayload.add("aps", badgePayload);

    return apsPayload;
  }

  /**
   * Send notification message to FCM for delivery to registered devices.
   *
   * @throws IOException
   */
  public static void sendCommonMessage() throws IOException {
    JsonObject notificationMessage = buildNotificationMessage();
    System.out.println("FCM request body for message using common notification object:");
    prettyPrint(notificationMessage);
    sendMessage(notificationMessage);
  }

  /**
   * Construct the body of a notification message request.
   *
   * @return JSON of notification message.
   */
  private static JsonObject buildNotificationMessage() {
    JsonObject jNotification = new JsonObject();
    jNotification.addProperty("title", TITLE);
    jNotification.addProperty("body", BODY);

    JsonObject jMessage = new JsonObject();
    jMessage.add("notification", jNotification);
    jMessage.addProperty("topic", "news");

    JsonObject jFcm = new JsonObject();
    jFcm.add(MESSAGE_KEY, jMessage);

    return jFcm;
  }

  /**
   * Read contents of InputStream into String.
   *
   * @param inputStream InputStream to read.
   * @return String containing contents of InputStream.
   * @throws IOException
   */
  private static String inputstreamToString(InputStream inputStream) throws IOException {
    StringBuilder stringBuilder = new StringBuilder();
    Scanner scanner = new Scanner(inputStream);
    while (scanner.hasNext()) {
      stringBuilder.append(scanner.nextLine());
    }
    return stringBuilder.toString();
  }

  /**
   * Pretty print a JsonObject.
   *
   * @param jsonObject JsonObject to pretty print.
   */
  private static void prettyPrint(JsonObject jsonObject) {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    System.out.println(gson.toJson(jsonObject) + "\n");
  }

  public static void main(String[] args) throws IOException {
    if (args.length == 1 && args[0].equals("common-message")) {
      sendCommonMessage();
    } else if (args.length == 1 && args[0].equals("override-message")) {
      sendOverrideMessage();
    } else {
      System.err.println("Invalid command. Please use one of the following commands:");
      // To send a simple notification message that is sent to all platforms using the common
      // fields.
      System.err.println("./gradlew run -Pmessage=common-message");
      // To send a simple notification message to all platforms using the common fields as well as
      // applying platform specific overrides.
      System.err.println("./gradlew run -Pmessage=override-message");
    }
  }

}

```

## RealTimeDataBase 서비스 조사

---

```java
/**
 * Copyright Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.firebase.quickstart;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;
import com.google.firebase.quickstart.email.MyEmailer;
import com.google.firebase.quickstart.model.Post;
import com.google.firebase.quickstart.model.User;
import java.io.IOException;
import org.knowm.sundial.SundialJobScheduler;

import java.io.FileInputStream;

/**
 * Firebase Database quickstart sample for the Java Admin SDK.
 * See: https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app
 */
public class Database {

    private static final String DATABASE_URL = "https://<YOUR-DATABASE>.firebaseio.com/";

    private static DatabaseReference database;

    /**
     * Notify a user of a new start and then update the last notification time.
     */
    private static void sendNotificationToUser(final String uid, final String postId) {
        // [START single_value_read]
        final DatabaseReference userRef = database.child("users").child(uid);
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            public void onDataChange(DataSnapshot dataSnapshot) {
                User user = dataSnapshot.getValue(User.class);
                if (user.email != null) {
                    // Send email notification
                    MyEmailer.sendNotificationEmail(user.email, uid, postId);
                }
            }

            public void onCancelled(DatabaseError databaseError) {
                System.out.println("Unable to get user data from " + userRef.getKey());
                System.out.println("Error: " + databaseError.getMessage());
            }
        });
        // [END single_value_read]
    }

    /**
     * Update the startCount value to equal the number of stars in the map.
     */
    private static void updateStarCount(DatabaseReference postRef) {
        // [START post_stars_transaction]
        postRef.runTransaction(new Transaction.Handler() {
            public Transaction.Result doTransaction(MutableData mutableData) {
                Post post = mutableData.getValue(Post.class);
                if (post != null) {
                    // Update the starCount to be the same as the number of members in the stars map.
                    if (post.stars != null) {
                        post.starCount = post.stars.size();
                    } else {
                        post.starCount = 0;
                    }

                    mutableData.setValue(post);
                    return Transaction.success(mutableData);
                } else {
                    return Transaction.success(mutableData);
                }
            }

            public void onComplete(DatabaseError databaseError, boolean complete, DataSnapshot dataSnapshot) {
                System.out.println("updateStarCount:onComplete:" + complete);
            }
        });
        // [END post_stars_transaction]
    }

    /**
     * Start global listener for all Posts.
     */
    public static void startListeners() {
        database.child("posts").addChildEventListener(new ChildEventListener() {

            public void onChildAdded(DataSnapshot dataSnapshot, String prevChildName) {
                final String postId = dataSnapshot.getKey();
                final Post post = dataSnapshot.getValue(Post.class);

                // Listen for changes in the number of stars and update starCount
                addStarsChangedListener(post, postId);

                // Listen for new stars on the post, notify users on changes
                addNewStarsListener(dataSnapshot.getRef(), post);
            }

            public void onChildChanged(DataSnapshot dataSnapshot, String prevChildName) {}

            public void onChildRemoved(DataSnapshot dataSnapshot) {}

            public void onChildMoved(DataSnapshot dataSnapshot, String prevChildName) {}

            public void onCancelled(DatabaseError databaseError) {
                System.out.println("startListeners: unable to attach listener to posts");
                System.out.println("startListeners: " + databaseError.getMessage());
            }
        });
    }

    /**
     * Listen for stars added or removed and update the starCount.
     */
    private static void addStarsChangedListener(Post post, String postId) {
        // Get references to the post in both locations
        final DatabaseReference postRef = database.child("posts").child(postId);
        final DatabaseReference userPostRef = database.child("user-posts").child(post.uid).child(postId);

        // When the post changes, update the star counts
        // [START post_value_event_listener]
        postRef.child("stars").addValueEventListener(new ValueEventListener() {
            public void onDataChange(DataSnapshot dataSnapshot) {
                updateStarCount(postRef);
                // [START_EXCLUDE]
                updateStarCount(userPostRef);
                // [END_EXCLUDE]
            }

            public void onCancelled(DatabaseError databaseError) {
                System.out.println("Unable to attach listener to stars for post: " + postRef.getKey());
                System.out.println("Error: " + databaseError.getMessage());
            }
        });
        // [END post_value_event_listener]
    }

    /**
     * Send email to author when new star is received.
     */
    private static void addNewStarsListener(final DatabaseReference postRef, final Post post) {
        // [START child_event_listener_recycler]
        postRef.child("stars").addChildEventListener(new ChildEventListener() {
            public void onChildAdded(DataSnapshot dataSnapshot, String prevChildName) {
                // New star added, notify the author of the post
                sendNotificationToUser(post.uid, postRef.getKey());
            }

            public void onChildChanged(DataSnapshot dataSnapshot, String prevChildName) {}

            public void onChildRemoved(DataSnapshot dataSnapshot) {}

            public void onChildMoved(DataSnapshot dataSnapshot, String prevChildName) {}

            public void onCancelled(DatabaseError databaseError) {
                System.out.println("Unable to attach new star listener to: " + postRef.getKey());
                System.out.println("Error: " + databaseError.getMessage());
            }
        });
        // [END child_event_listener_recycler]
    }

    /**
     * Send an email listing the top posts every Sunday.
     */
    private static void startWeeklyTopPostEmailer() {
        SundialJobScheduler.startScheduler("com.google.firebase.quickstart.email");
    }

    public static void main(String[] args) {
        // Initialize Firebase
        try {
            // [START initialize]
            FileInputStream serviceAccount = new FileInputStream("service-account.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(DATABASE_URL)
                    .build();
            FirebaseApp.initializeApp(options);
            // [END initialize]
        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials. See README.");
            System.out.println(e.getMessage());

            System.exit(1);
        }

        // Shared Database reference
        database = FirebaseDatabase.getInstance().getReference();

        // Start listening to the Database
        startListeners();

        // Kick off weekly email task
        startWeeklyTopPostEmailer();
    }

}
```



## REST 요청 인증 서비스 조사

---

