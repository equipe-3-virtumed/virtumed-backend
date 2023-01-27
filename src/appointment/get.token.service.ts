import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { Patient, Doctor } from '@prisma/client';
import jwt, { SignOptions } from 'jsonwebtoken';
import fetch from 'node-fetch';

interface Token {
  roomId: string;
  videoToken: string;
}

@Injectable()
export class GetTokenService {
  // constructor(private readonly jwtService: JwtService) {}
  
  async GetToken(appointmentId: string): Promise<Token> {
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

    const tokenOptions = {
      method: "POST",
      headers: {
        "Authorization": `${videoToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"region" : "sg001", "customRoomId" : `${appointmentId}`}),
    };
    const url= `https://api.videosdk.live/v2/rooms`;
    const response = await fetch(url, tokenOptions);
    const data = await response.json();
    const roomId: string = data.roomId;

    return { roomId, videoToken };
  }
}
