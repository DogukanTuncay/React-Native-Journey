import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../src/screens/WelcomeScreen';

describe('WelcomeScreen', () => {
  it('Hoş geldin mesajı ve tüm butonlar görünüyor', () => {
    const { getByText } = render(<WelcomeScreen onNavigate={jest.fn()} />);
    expect(getByText('Hoş Geldiniz! 👋')).toBeTruthy();
    expect(getByText('Giriş Yap')).toBeTruthy();
    expect(getByText('Bildirim Testi')).toBeTruthy();
    expect(getByText('Aktivite & Sensör Takibi')).toBeTruthy();
  });

  it('Giriş Yap butonuna basınca onNavigate çağrılır', () => {
    const onNavigate = jest.fn();
    const { getByText } = render(<WelcomeScreen onNavigate={onNavigate} />);
    fireEvent.press(getByText('Giriş Yap'));
    expect(onNavigate).toHaveBeenCalledWith('Login');
  });

  it('Bildirim Testi butonuna basınca onNavigate çağrılır', () => {
    const onNavigate = jest.fn();
    const { getByText } = render(<WelcomeScreen onNavigate={onNavigate} />);
    fireEvent.press(getByText('Bildirim Testi'));
    expect(onNavigate).toHaveBeenCalledWith('Notifications');
  });

  it('Aktivite & Sensör Takibi butonuna basınca onNavigate çağrılır', () => {
    const onNavigate = jest.fn();
    const { getByText } = render(<WelcomeScreen onNavigate={onNavigate} />);
    fireEvent.press(getByText('Aktivite & Sensör Takibi'));
    expect(onNavigate).toHaveBeenCalledWith('ActivityTracker');
  });

}); 