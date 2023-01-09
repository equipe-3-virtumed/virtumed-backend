import twilio from "twilio";

export const getTwilioToken = (userId: string, roomId: string) => {
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  const videoGrant = new VideoGrant({
    room: roomId,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: userId },
  );
  token.addGrant(videoGrant);

  return token.toJwt();
};
