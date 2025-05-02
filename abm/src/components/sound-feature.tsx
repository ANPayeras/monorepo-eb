import React from 'react'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';

const SoundFeature = () => {
    // const { handleOnChangeSoundEffect, layout: { soundEffect } } = useDataStore(state => state)

    // const [play, { stop }] = useSound(soundUrl, {
    //     onend: () => play(),
    //     volume: 1,
    // });

    return (
        <div className='flex justify-between items-center h-8'>
            <span className='text-sm md:text-medium'>Sonido de fondo:</span>
            <Select>
                <SelectTrigger className="w-[100px] lg:w-[180px] max-h-8">
                    <SelectValue placeholder="Sonido" />
                </SelectTrigger>
                <SelectContent>
                    {/* {
                        sounds.map(s => (
                            <SelectItem key={s.name} value={s.url}>{s.name}</SelectItem>
                        ))
                    } */}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SoundFeature