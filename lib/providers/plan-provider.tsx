import { createPlanReducer, initialCreatePlanState } from '@/components/create-plan-wizard/create-plan-reducer';
import { CreatePlanAction, CreatePlanState } from '@/components/create-plan-wizard/create-plan.types';
import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

const PlanContext = createContext<{
  state: CreatePlanState;
  dispatch: Dispatch<CreatePlanAction>;
} | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(createPlanReducer, initialCreatePlanState);

  return (
    <PlanContext.Provider value={{ state, dispatch }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error('usePlanContext must be used within a PlanProvider');
  }

  return context;
};
