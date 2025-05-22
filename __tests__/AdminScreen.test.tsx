import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AdminScreen from '../src/screens/Admin/AdminScreen';

describe('AdminScreen', () => {
  it('Dashboard ve Kullanıcılar tabları görünüyor', () => {
    const { getByText } = render(<AdminScreen onNavigate={jest.fn()} />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Kullanıcılar')).toBeTruthy();
  });

  it('Tablar arası geçiş yapılabiliyor', () => {
    const { getByText } = render(<AdminScreen onNavigate={jest.fn()} />);
    fireEvent.press(getByText('Kullanıcılar'));
    expect(getByText('Kullanıcılar')).toBeTruthy();
    fireEvent.press(getByText('Dashboard'));
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('Arama kutusu ve kullanıcı listesi görünüyor', () => {
    const { getByPlaceholderText, getByText } = render(<AdminScreen onNavigate={jest.fn()} />);
    expect(getByPlaceholderText('Ara...')).toBeTruthy();
    expect(getByText('Toplam Kullanıcı')).toBeTruthy();
  });
}); 