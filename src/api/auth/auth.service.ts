import { supabaseAdmin } from '../../config/supabase';
import { SignUpInput, LoginInput } from './auth.validation';

export class AuthService {
  static async signUp(credentials: SignUpInput) {
    const { email, password, name } = credentials;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: name || '',
        role: 'admin'
      },
      email_confirm: true
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role
      }
    };
  }

  static async login(credentials: LoginInput) {
    const { email, password } = credentials;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error('Invalid credentials');
    }

    return {
      token: data.session?.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role
      }
    };
  }
}