import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui'

const WalletConnectionButton = ({ text }) => {
    return <BaseWalletMultiButton
        labels={{
            'change-wallet': 'Change wallet',
            connecting: 'Connecting ...',
            'copy-address': 'Copy address',
            copied: 'Copied',
            disconnect: 'Disconnect',
            'has-wallet': 'Connect',
            'no-wallet': text || 'Connect Wallet',
        }}
    />
}

export default WalletConnectionButton