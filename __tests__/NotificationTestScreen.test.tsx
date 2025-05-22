import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotificationTestScreen from '../src/screens/NotificationTestScreen';

describe('NotificationTestScreen', () => {
  it('Sepete Ekle ve Local Bildirim Gönder butonları görünüyor', () => {
    const { getByText } = render(<NotificationTestScreen />);
    expect(getByText('Sepete Ekle')).toBeTruthy();
    expect(getByText('Local Bildirim Gönder')).toBeTruthy();
  });

  it('Sepete Ekle butonuna basınca sepetteki ürün sayısı artar', () => {
    const { getByText } = render(<NotificationTestScreen />);
    const sepeteEkleBtn = getByText('Sepete Ekle');
    fireEvent.press(sepeteEkleBtn);
    expect(getByText(/Sepette: 1/)).toBeTruthy();
    fireEvent.press(sepeteEkleBtn);
    expect(getByText(/Sepette: 2/)).toBeTruthy();
  });
}); 