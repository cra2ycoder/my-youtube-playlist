import Box from '@mui/material/Box'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import React from 'react'

interface IBreadcrumbProps {
  links: string[]
}

function Breadcrumbs(props: IBreadcrumbProps) {
  const { links = [] } = props

  return (
    <Box style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
      {props?.links?.map((x: string, idx: number) => {
        const link = x === 'home' ? '/' : `/${x}`
        return (
          <Box
            key={`breadcrumb-${idx}`}
            style={{ display: 'flex', gap: '1rem' }}
          >
            {links.length - 1 === idx ? (
              <Typography>{x.substring(1, x.length)}</Typography>
            ) : (
              <>
                <Link href={link}>{x}</Link>
                <div>{`>`}</div>
              </>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default Breadcrumbs
