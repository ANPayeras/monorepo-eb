import React, { forwardRef, HTMLAttributes, useState } from 'react';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    MeasuringStrategy,
    DropAnimation,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import type {
    DragStartEvent,
    DragEndEvent,
    MeasuringConfiguration,
    UniqueIdentifier,
} from '@dnd-kit/core';
import {
    arrayMove,
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import dndStyles from './dnd-list.module.css';
import classNames from 'classnames';
import { Widget } from '@/stores/data-store';

export interface PageProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'id'> {
    item: Widget;
    active?: boolean;
    clone?: boolean;
    id: UniqueIdentifier;
    index?: number;
    onRender: (Widget: Widget, props: any) => JSX.Element;
}

type DndListProps = {
    data: Widget[];
    onRender: (Widget: Widget, props: any) => JSX.Element;
    onDataUpdate: (Widgets: Widget[]) => void;
}

export const Page = forwardRef<HTMLLIElement, PageProps>(function Page(
    { id, index, active, clone, style, item, onRender, ...props },
    ref
) {
    return (
        <li
            className={classNames(
                dndStyles.Wrapper,
                active && dndStyles.active,
                clone && dndStyles.clone,
                dndStyles.vertical
            )}
            style={style}
            ref={ref}
        >
            <div className={`${dndStyles.Page} rounded-md relative group`}>
                {onRender(item, props)}
            </div>
        </li>
    );
});

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

const dropAnimation: DropAnimation = {
    keyframes({ transform }) {
        return [
            { transform: CSS.Transform.toString(transform.initial) },
            {
                transform: CSS.Transform.toString({
                    scaleX: 0.98,
                    scaleY: 0.98,
                    x: transform.final.x - 10,
                    y: transform.final.y - 10,
                }),
            },
        ];
    },
    sideEffects: defaultDropAnimationSideEffects({
        className: {
            active: dndStyles.active,
        },
    }),
};

export default function DndList({ data, onRender, onDataUpdate }: DndListProps) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    function handleDragStart({ active }: DragStartEvent) {
        const activeIndex = data.findIndex(w => w.id === active.id)
        setActiveId(active.id);
        setActiveIndex(activeIndex)
    }

    function handleDragCancel() {
        setActiveId(null);
        setActiveIndex(null);
    }

    function handleDragEnd({ over }: DragEndEvent) {
        if (over) {
            const overIndex = data.findIndex(w => w.id === over.id)

            if (activeIndex !== overIndex) {
                onDataUpdate(arrayMove(data, activeIndex!, overIndex))
            }
        }

        setActiveId(null);
        setActiveIndex(null);
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
        >
            <SortableContext items={data}>
                <ul className='w-[90%] flex flex-col gap-4 p-2 overflow-x-clip overflow-y-visible'>
                    {data.map((w, index) => (
                        <SortablePage
                            key={index}
                            item={w}
                            id={`${w.id}`}
                            index={index + 1}
                            onRender={onRender}
                        />
                    ))}
                </ul>
            </SortableContext>
            <DragOverlay dropAnimation={dropAnimation}>
                {activeId != null ? (
                    <PageOverlay id={activeId} onRender={onRender} item={data[activeIndex!]} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

function PageOverlay({
    id,
    item,
    onRender,
    ...props
}: Omit<PageProps, 'index'>) {
    return (
        <Page
            id={id}
            clone
            item={item}
            onRender={onRender}
            {...props}
        />
    );
}

function SortablePage({
    id,
    item,
    onRender,
    ...props
}: PageProps) {
    const {
        attributes,
        listeners,
        isDragging,
        isSorting,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        animateLayoutChanges: () => true,
    });

    return (
        <Page
            ref={setNodeRef}
            item={item}
            id={id}
            active={isDragging}
            style={{
                transition,
                transform: isSorting ? undefined : CSS.Translate.toString(transform),
            }}
            onRender={onRender}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
}