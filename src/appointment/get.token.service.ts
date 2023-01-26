import { Patient, Doctor } from '@prisma/client';

export const getToken = async (
  user: Patient | Doctor,
  appointmentId: string,
) => {
  const videoToken = 'getVideoToken.toJwt()';
  const chatToken = 'getChatToken.toJwt()';

  return { videoToken, chatToken };
};
