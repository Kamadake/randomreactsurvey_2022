import "./ImageList.css";

export function ImageList() {
    const listOfCards = new Array(4).fill(0).map((value, index) => (
        <div key={index} className='imagelist__image-card'>
          <img className='fullWidth' src='https://picsum.photos/640/360' />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna arcu, sagittis vel fringilla eget, finibus ac odio. Quisque malesuada id magna pharetra aliquet. Sed tristique ipsum ut ullamcorper eleifend.</p>
        </div>
      ));

    return (
        <div className='imagelist'>
            {listOfCards}
        </div>
    )
}
