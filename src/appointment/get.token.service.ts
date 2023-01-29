import { Injectable } from '@nestjs/common';
import jwt, { SignOptions } from 'jsonwebtoken';

@Injectable()
export class GetTokenService {

  async GetToken(appointmentId: string): Promise<string> {
    const options: SignOptions = { expiresIn: '2h', algorithm: 'HS256' };

    const payload = {
      apikey: process.env.API_KEY_VIDEOSDK,
      permissions: ['allow_join'],
    };

    const videoToken = jwt.sign(
      payload,
      process.env.API_SECRET_VIDEOSDK,
      options,
    );

    // const tokenOptions = {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `${videoToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({"region" : "sg001", "customRoomId" : `${appointmentId}`}),
    // };
    // const url= `https://api.videosdk.live/v2/rooms`;
    // const response = (url, tokenOptions);
    // const data: any = await response.json();
    // const roomId: string = data.roomId;

    return videoToken;
  }
}
