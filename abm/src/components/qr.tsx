import { useQuery } from 'convex/react';
import { useQRCode } from 'next-qrcode';
import { api } from '../../convex/_generated/api';
import { Spinner } from "@nextui-org/spinner";
import Link from 'next/link';
import { VIEW_URL } from '@/constants/envs';

const Qr = () => {
    const { Canvas } = useQRCode();
    const user = useQuery(api.users.getCurrentUser)
    const URL = `${VIEW_URL}/test/${user?.username}`
    return (
        <div className='relative flex flex-col w-full gap-4 items-center'>
            {
                !user ?
                    <span className='absolute top-0 left-0 w-full h-20 bg-gray-100 opacity-90 flex justify-center items-center'>
                        <Spinner size='lg' />
                    </span> :
                    <>
                        <Canvas
                            text={user ? URL : 'fallback'}
                            options={{
                                errorCorrectionLevel: 'M',
                                margin: 1,
                                scale: 4,
                                width: 200,
                            }}
                        />
                        <Link
                            className='w-full text-slate-800 overflow-hidden text-ellipsis text-nowrap hover:underline'
                            href={URL}
                            target='_blank'
                        >
                            {URL}
                        </Link>
                    </>

            }
        </div>
    );
};

export default Qr;
