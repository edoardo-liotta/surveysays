import React from 'react'

export type Referrable<T> = {
  ref: React.RefObject<T>
}