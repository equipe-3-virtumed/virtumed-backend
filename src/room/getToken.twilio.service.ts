import { Patient, Doctor } from '@prisma/client';
import twilio from 'twilio';

export const getTwilioToken = async (
  user: Patient | Doctor,
  roomId: string,
) => {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  const client = twilio(twilioAccountSid, twilioApiKey);

  client.video.v1.rooms.create({
    uniqueName: roomId,
  });

  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const videoGrant = new VideoGrant({
    room: roomId,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: user.id },
  );
  token.addGrant(videoGrant);

  return token.toJwt();
};
