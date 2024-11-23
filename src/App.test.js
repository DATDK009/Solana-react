import { render, screen, fireEvent } from '@testing-library/react';
import WalletConnect from './App';

// Mô phỏng window.solana trong môi trường kiểm thử
beforeAll(() => {
  global.window.solana = {
    isPhantom: true,
    on: jest.fn(),
    connect: jest.fn().mockResolvedValue({ publicKey: { toString: jest.fn().mockReturnValue('mock-public-key') } }),
    disconnect: jest.fn(),
  };
});

afterAll(() => {
  delete global.window.solana;
});

test('renders and connects/disconnects wallet', async () => {
  render(<WalletConnect />);

  const connectButton = screen.getByText(/Connect Phantom Wallet/i);
  expect(connectButton).toBeInTheDocument();

  // Mô phỏng kết nối ví
  fireEvent.click(connectButton);

  const connectedText = await screen.findByText(/Wallet connected: mock-public-key/i);
  expect(connectedText).toBeInTheDocument();

  const disconnectButton = screen.getByText(/Disconnect Wallet/i);
  expect(disconnectButton).toBeInTheDocument();

  // Mô phỏng ngắt kết nối ví
  fireEvent.click(disconnectButton);

  const reconnectButton = screen.getByText(/Connect Phantom Wallet/i);
  expect(reconnectButton).toBeInTheDocument();
});
