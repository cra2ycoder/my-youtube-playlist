import Index from './index'

function Dynamic(props) {
  return <Index asPath={props.url} />
}

export async function getServerSideProps(props) {
  return {
    props: {
      url: props.req.url,
    },
  }
}

export { Dynamic }
export default Dynamic
