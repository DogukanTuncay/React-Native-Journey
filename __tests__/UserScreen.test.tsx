import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserScreen from '../src/screens/User/UserScreen';
import { UserProvider } from '../src/context/UserContext';

const customRender = (ui: any, options?: any) =>
  render(<UserProvider>{ui}</UserProvider>, options);

describe('UserScreen', () => {
  it('Motivasyon sözü ve başlıklar görünüyor', () => {
    const { getByText } = customRender(<UserScreen onNavigate={jest.fn()} username="Ali" />, undefined);
    expect(getByText('Merhaba, Ali')).toBeTruthy();
    expect(getByText('İyi Hisset')).toBeTruthy();
    expect(getByText(/Değişim içeriden başlar/)).toBeTruthy();
  });

  it('Ruh hali seçimi yapılabiliyor', () => {
    const { getByText } = customRender(<UserScreen onNavigate={jest.fn()} username="Ali" />, undefined);
    fireEvent.press(getByText('Kötü'));
    fireEvent.press(getByText('Normal'));
    fireEvent.press(getByText('İyi'));
    fireEvent.press(getByText('Mutlu'));
    fireEvent.press(getByText('Harika'));
  });

  it('Çıkış butonuna basınca onNavigate çağrılır', () => {
    const onNavigate = jest.fn();
    const { getByText } = customRender(<UserScreen onNavigate={onNavigate} username="Ali" />, undefined);
    fireEvent.press(getByText('Çıkış Yap'));
    expect(onNavigate).toHaveBeenCalledWith('Welcome');
  });
}); 