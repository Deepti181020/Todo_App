import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "src/auth/auth.service";
import { Constants } from "src/utils/constants";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        });

        console.log('GoogleStrategy Initialized');
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        console.log('Google Access Token:', accessToken);
        console.log('Google Profile:', profile);

        const { emails, displayName } = profile;
        const email = emails[0].value;

        let user = await this.authService.findUserByEmail(email);

        if (!user) {
            user = await this.authService.createUser({
                firstName: displayName.split(" ")[0],
                lastName: displayName.split(" ")[1] || '',
                email: email,
                password: '', // No password needed for Google-authenticated users
                role: Constants.ROLES.NORMAL_ROLE, // Assign a default role
            });
        }

        const userPayload = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return done(null, userPayload);
    }
}
