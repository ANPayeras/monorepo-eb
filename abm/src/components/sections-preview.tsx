import React, { FC } from 'react'
import EditPreview from './edit-preview'
import CombosPreview from './combos-preview';

const SectionsPreview: FC<{ section: string, combo: number }> = ({ section, combo }) => {
    const templates: {
        [index: string]: JSX.Element;
    } = {
        menu: <EditPreview />,
        combos: <CombosPreview {...{ combo }} />,
    }
    return templates[section]
}

export default SectionsPreview