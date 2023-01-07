import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  create(createRoomDto: CreateRoomDto) {
    return 'This action schedule a new room';
  }

  findOne(id: string) {
    const AccessToken = require('twilio').jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    // Used when generating any kind of tokens
    // To set up environmental variables, see http://twil.io/secure
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioApiKey = process.env.TWILIO_API_KEY;
    const twilioApiSecret = process.env.TWILIO_API_SECRET;

    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: 'cool room',
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {identity: id}
    );
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    console.log(token.toJwt());
    return token.toJwt();
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
