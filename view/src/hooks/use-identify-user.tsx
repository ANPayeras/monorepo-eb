import { usePostHog } from 'posthog-js/react';
import { Doc, Id } from '../../convex/_generated/dataModel';

const useIdentifyUser = () => {
    const posthog = usePostHog();

    const identifyUser = (template: Doc<"templates">, userId: Id<"users">) => {
        if (posthog.get_distinct_id() !== template._id) {
            posthog.identify(template._id, { user: userId })
        }
    }

    return {
        identifyUser,
    }
}

export default useIdentifyUser