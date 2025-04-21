import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent } from '@mui/material';

const handleStyle = { left: 10 };

const DefaultNode = ({ data }) => {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);


    // 1 ile 4 arasında random sayı oluştur. 1 ve 4 dahil
    const rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);

    return (
        <>
            <img src={`/images/space/asteroid-${rand}.svg`} alt='asteroid'
                style={{ width: 'auto', height: '80px' }}
            />

            <Card>
                <CardContent>
                    <label htmlFor="text">Text:</label>
                    {data.label}
                    {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
                </CardContent>
            </Card>

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} id="a" />
            {/* <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            /> */}
        </>
    );
}

export default DefaultNode