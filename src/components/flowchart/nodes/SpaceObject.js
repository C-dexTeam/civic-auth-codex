
import { Handle, Position } from '@xyflow/react';

const SpaceObject = ({ object = "asteroid" }) => {
    // 1 ile 4 arasında random sayı oluştur. 1 ve 4 dahil
    const rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);

    // 0 ile 360 arasında random sayı oluştur. 0 ve 360 dahil
    const deg = Math.floor(Math.random() * (360 - 0 + 1) + 0);

    return (
        <>
            <img src={`/images/space/${object}-${rand}.svg`} alt={`${object}-${rand}`}
                style={{
                    width: 'auto',
                    height: '80px',
                    transform: `rotate(${deg}deg)`,
                }}
            />

            <Handle type="target" position={Position.Top}
                style={{
                    border: "unset",
                    background: "transparent",
                }}
            />
            <Handle type="source" position={Position.Bottom} id="a"
                style={{
                    border: "unset",
                    background: "transparent",
                }}
            />
        </>
    );
}

export default SpaceObject