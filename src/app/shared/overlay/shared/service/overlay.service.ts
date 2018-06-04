export class OverlayService {
  overlay = [
    {
      isOverlay: true,
      overlay: 'bands',
      comments: [
        {
          class: 'arrowBoxTop',
          top: null,
          left: null,
          comment: 'Dropdown menu where you can see all bands by select a genre.'
        },
        {
          class: 'arrowBoxTop',
          top: null,
          left: null,
          comment: 'Input where you can type character and see all bands by name.'
        }
      ]
    },
    {
      isOverlay: true,
      overlay: 'about',
      comments: [
        {
          class: 'arrowBoxDiscography',
          top: null,
          left: null,
          comment: 'When you hover on "Discography" the edit button is shown and you can click them to add new Album.'
        }
      ]
    },
    {
      isOverlay: true,
      overlay: 'gallery',
      comments: [
        {
          class: 'arrowBoxGallery',
          top: null,
          left: null,
          comment: 'When you hover on "Gallery" the edit button is shown and you can click them to add new Image.'
        }
      ]
    },
    {
      isOverlay: true,
      overlay: 'members',
      comments: [
        {
          class: 'arrowBoxMembers',
          top: null,
          left: null,
          comment: 'When you hover on "Active" the edit button is shown and you can click them to add new Member.'
        }
      ]
    }
  ];
}
