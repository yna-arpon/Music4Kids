const ModuleOptns = () => {
  return (
    <div>
        <div>
            <button className="btn" onClick={
              () => {
                document.getElementById('start').classList.add('hidden')
              }
            }>TUTORIAL</button>
        </div>
        <div>
            <button className="btn">FREE STYLE</button>
        </div>
    </div>
  )
}

export default ModuleOptns