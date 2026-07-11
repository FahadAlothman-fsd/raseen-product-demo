'use client'

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react'
import { chapters } from '@/lib/demo-data'

export type View =
  | 'sso'
  | 'overview'
  | 'compliance'
  | 'sync'
  | 'contract'
  | 'integrations'
  | 'audit'
  | 'reports'
  | 'report'
  | 'verification'

export type AuditTab =
  | 'overview'
  | 'controls'
  | 'submissions'
  | 'response'
  | 'syncs'
  | 'report'

export type DemoState = {
  chapter: number
  signedIn: boolean
  authenticating: boolean
  view: View
  auditTab: AuditTab
  submissionRound: 1 | 2
  responseSubmitted: boolean
  presenterMode: boolean
}

const initialState: DemoState = {
  chapter: 1,
  signedIn: false,
  authenticating: false,
  view: 'sso',
  auditTab: 'overview',
  submissionRound: 1,
  responseSubmitted: false,
  presenterMode: false,
}

// Deterministic snapshot for each chapter.
function snapshotFor(chapter: number, base: DemoState): DemoState {
  const signedIn = chapter > 1
  const responseSubmitted = chapter >= 9 ? true : base.responseSubmitted
  const presenterMode = base.presenterMode
  switch (chapter) {
    case 1:
      return { ...initialState, presenterMode }
    case 2:
      return { ...base, chapter, signedIn, view: 'integrations' }
    case 3:
      return { ...base, chapter, signedIn, view: 'compliance' }
    case 4:
      return { ...base, chapter, signedIn, view: 'sync' }
    case 5:
      return { ...base, chapter, signedIn, view: 'contract' }
    case 6:
      return { ...base, chapter, signedIn, view: 'audit', auditTab: 'overview' }
    case 7:
      return {
        ...base,
        chapter,
        signedIn,
        view: 'audit',
        auditTab: 'submissions',
        submissionRound: 1,
      }
    case 8:
      return { ...base, chapter, signedIn, view: 'audit', auditTab: 'response' }
    case 9:
      return {
        ...base,
        chapter,
        signedIn,
        view: 'audit',
        auditTab: 'submissions',
        submissionRound: 2,
        responseSubmitted: true,
      }
    case 10:
      return { ...base, chapter, signedIn, view: 'report', responseSubmitted }
    case 11:
      return { ...base, chapter, signedIn, view: 'verification', responseSubmitted }
    default:
      return base
  }
}

type Action =
  | { type: 'goToChapter'; chapter: number }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'reset' }
  | { type: 'signIn' }
  | { type: 'startAuth' }
  | { type: 'navigate'; view: View }
  | { type: 'setAuditTab'; tab: AuditTab }
  | { type: 'setSubmissionRound'; round: 1 | 2 }
  | { type: 'submitResponse' }
  | { type: 'togglePresenter' }
  | { type: 'setPresenter'; on: boolean }

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case 'goToChapter':
      return snapshotFor(action.chapter, state)
    case 'next': {
      const n = Math.min(chapters.length, state.chapter + 1)
      return snapshotFor(n, state)
    }
    case 'prev': {
      const n = Math.max(1, state.chapter - 1)
      return snapshotFor(n, state)
    }
    case 'reset':
      return { ...initialState, presenterMode: state.presenterMode }
    case 'togglePresenter':
      return { ...state, presenterMode: !state.presenterMode }
    case 'setPresenter':
      return { ...state, presenterMode: action.on }
    case 'startAuth':
      return { ...state, authenticating: true }
    case 'signIn':
      return {
        ...state,
        signedIn: true,
        authenticating: false,
        chapter: state.chapter < 2 ? 2 : state.chapter,
        view: 'integrations',
      }
    case 'navigate':
      return { ...state, view: action.view }
    case 'setAuditTab':
      return { ...state, view: 'audit', auditTab: action.tab }
    case 'setSubmissionRound':
      return { ...state, submissionRound: action.round }
    case 'submitResponse':
      return {
        ...state,
        responseSubmitted: true,
        view: 'audit',
        auditTab: 'submissions',
        submissionRound: 2,
        chapter: 9,
      }
    default:
      return state
  }
}

type DemoContextValue = {
  state: DemoState
  dispatch: React.Dispatch<Action>
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DemoContext.Provider value={{ state, dispatch }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
