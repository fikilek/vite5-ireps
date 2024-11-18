// css
import "@/components/media/MediaAlbum.css";

const MediaAlbum = (props) => {
	const { media } = props;
	// console.log(`media`, media);

	return (
		<div className="media-album">
			{media?.map((media) => {
				return (
					<div className="media" key={media.id}>
						<img
							// onClick={handleClick}
							id={media.id}
							width={230}
							// height={"220rem"}
							src={media.url}
							alt={media.metadata.mediaCategory}
							className="media-image-btn m-btn"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default MediaAlbum;
