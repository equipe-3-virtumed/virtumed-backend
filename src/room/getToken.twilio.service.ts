import { Patient, Doctor } from '@prisma/client';
import twilio from 'twilio';

export const getTwilioToken = async (
  user: Patient | Doctor,
  roomId: string,
) => {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  // const client = twilio(twilioAccountSid, twilioApiKey);

  // await client.video.v1.rooms.create({ uniqueName: roomId }).then((room) => {
  //   console.log('🚀 ~ file: getToken.twilio.service.ts:16 ~ room', room);
  // });
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const videoGrant = new VideoGrant({
    room: roomId,
  });
  console.log("🚀 ~ file: getToken.twilio.service.ts:23 ~ videoGrant", videoGrant)

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: user.id },
  );
  token.addGrant(videoGrant);
  console.log("🚀 ~ file: getToken.twilio.service.ts:33 ~ token.toJwt()", token.toJwt())

  return token.toJwt();
};
