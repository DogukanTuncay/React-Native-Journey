import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { Alert } from 'react-native';

describe('LoginScreen', () => {
  it('Form alanları ve buton görünüyor', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen onNavigate={jest.fn()} />);
    expect(getByPlaceholderText('E-posta')).toBeTruthy();
    expect(getByPlaceholderText('Şifre')).toBeTruthy();
    expect(getByText('Giriş Yap')).toBeTruthy();
  });

  it('Boş formda uyarı verir', () => {
    jest.spyOn(Alert, 'alert');
    const { getByText } = render(<LoginScreen onNavigate={jest.fn()} />);
    fireEvent.press(getByText('Giriş Yap'));
    expect(Alert.alert).toHaveBeenCalledWith('Hata', 'Lütfen tüm alanları doldurun!');
  });

  it('Geçerli formda onNavigate çağrılır', () => {
    const onNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onNavigate={onNavigate} />);
    fireEvent.changeText(getByPlaceholderText('E-posta'), 'ali@mail.com');
    fireEvent.changeText(getByPlaceholderText('Şifre'), '123456');
    fireEvent.press(getByText('Giriş Yap'));
    expect(onNavigate).toHaveBeenCalled();
  });
}); 