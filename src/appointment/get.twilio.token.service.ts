import { Patient, Doctor } from '@prisma/client';
import twilio from 'twilio';

export const getTwilioToken = async (
  user: Patient | Doctor,
  appointmentId: string,
) => {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  // const client = twilio(twilioAccountSid, twilioApiKey);

  // await client.video.v1.appointments.create({ uniqueName: appointmentId }).then((appointment) => {
  //   console.log('🚀 ~ file: getToken.twilio.service.ts:16 ~ appointment', appointment);
  // });
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;
  // const ChatGrant = AccessToken.ChatGrant;

  const videoGrant = new VideoGrant({
    room: appointmentId,
  });

  const getVideoToken = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: user.id },
  );
  getVideoToken.addGrant(videoGrant);

  const videoToken = getVideoToken.toJwt();
  const chatToken = 'getChatToken.toJwt()';

  return { videoToken, chatToken };
};
