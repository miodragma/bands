import { AddBandComponent } from './add-band.component';
import { BandsService } from '../bands/shared/service/bands.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Band } from '../bands/shared/model/band.model';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';

describe('AddBandComponent unit', () => {
  let component: AddBandComponent;
  let service: BandsService;

  beforeEach(() => {
    service = new BandsService(null);
    component = new AddBandComponent(null, service);
  });

  describe('generetesGroup', () => {
    it('should set genresGroups with the data returned from the server', () => {
      const dummyAllGenres = [
        {
          title_genre_id: 9,
          title_genre: 'Alternative',
          genres: [{name: 'Alternative', id: 12}, {name: 'Crust Punk', id: 13}]
        },
        {
          title_genre_id: 9,
          title_genre: 'Metal',
          genres: [{name: 'Heavy Metal', id: 3}, {name: 'Thrash Metal', id: 1}]
        }
      ];
      spyOn(service, 'getAllGenres').and.callFake(() => {
        return Observable.from([dummyAllGenres]);
      });

      component.ngOnInit();

      expect(component.genreGroups).toBe(dummyAllGenres);
    });
  });

  describe('Fill form', () => {
    describe('Band Form', () => {
      it('should add data to newBandData["band"] from #bandForm onBandForm()', () => {
        const bandForm = <NgForm>{
          value: {
            band: 'Metallica',
            bandImage: 'http://image.jpg',
            about: 'About Metallica text'
          }
        };

        component.onBandForm(bandForm);

        expect(component.newBandData['band'].name).toEqual('Metallica');
        expect(component.newBandData['band'].image).toEqual('http://image.jpg');
        expect(component.newBandData['band'].about).toEqual('About Metallica text');
      });
    });

    describe('Genres Form', () => {
      it('should add data to newBandData["genres"] from #genreForm onGenreForm()', () => {
        const genreForm = <NgForm>{
          value: {
            genre: 'Metal',
          }
        };

        component.onGenreForm(genreForm);

        expect(component.newBandData['genres']).toEqual('Metal');
      });
    });

    describe('Members Form', () => {
      beforeEach(() => {
        component.initMembers();
      });
      it('should create new FormGroup for Member onAddNewMember()', () => {
        component.onAddNewMember();
        expect(component.newMembers.value.members.length).toBe(2);
      });

      it('should remove member by index from newMembers onRemoveMember()', () => {
        component.onRemoveMember(0);

        expect(component.newMembers.value.members.length).toBe(0);
      });

      it('should add member to newBandData["members"] from #memberForm onMembersForm()', () => {
        (<FormArray>component.newMembers.controls['members']).at(0).patchValue({
          firstName: 'James',
          lastName: 'Hetfield',
          image: 'http://image.jpg',
          profession: 'lead vocals, rhythm guitar',
          former: false
        });

        component.onMembersForm();

        expect(component.newBandData['members']).toEqual(component.newMembers.value.members);
      });
    });

    describe('Discography Form', () => {
      beforeEach(() => {
        component.initDiscography();
      });
      it('should create new FormGroup for Album onAddNewAlbum()', () => {
        component.onAddNewAlbum();
        expect(component.discography.value.newAlbum.length).toBe(2);
      });

      it('should remove album by index from discography onRemoveAlbum()', () => {
        component.onRemoveAlbum(0);

        expect(component.discography.value.newAlbum.length).toBe(0);
      });

      it('should add album to newBandData["discography"] from #discographyForm onDiscographyForm()', () => {
        (<FormArray>component.discography.controls['newAlbum']).at(0).patchValue({
          album: 'Metallica',
          year: 1991,
          tracks: 12,
          image: 'http://image.jpg'
        });

        component.onDiscographyForm();

        expect(component.newBandData['discography']).toEqual(component.discography.value.newAlbum);
      });
    });

    describe('Gallery Form', () => {
      beforeEach(() => {
        component.initGallery();
      });

      it('should create new FormGroup for Gallery onAddNewImage()', () => {
        component.onAddNewImage();
        expect(component.gallery.value.images.length).toBe(2);
      });

      it('should remove image by index from Gallery onRemoveImage()', () => {
        component.onRemoveImage(0);

        expect(component.gallery.value.images.length).toBe(0);
      });

      it('should add image to newBandData["gallery"] from #galleryForm onGalleryForm()', () => {
        (<FormArray>component.gallery.controls['images']).at(0).patchValue({
          image: 'http://image.jpg'
        });

        component.onGalleryForm();

        expect(component.newBandData['gallery']).toEqual(component.gallery.value.images);
      });
    });
  });
});
