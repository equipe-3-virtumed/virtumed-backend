import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { Patient, Doctor } from '@prisma/client';
import jwt, { SignOptions } from 'jsonwebtoken';
import fetch from 'node-fetch';

@Injectable()
export class GetTokenService {
  // constructor(private readonly jwtService: JwtService) {}

  async GetToken(user: Patient | Doctor, appointmentId: string): Promise<string> {
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
    console.log("🚀 ~ file: get.token.service.ts:36 ~ GetTokenService ~ GetToken ~ data", data)

    return data;
  }
}


