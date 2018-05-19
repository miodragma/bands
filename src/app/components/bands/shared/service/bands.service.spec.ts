import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BandsService } from './bands.service';

import { Band } from '../model/band.model';
import { AboutBand } from '../../../about/shared/model/aboutBand.model';
import { Member } from '../../../members/shared/model/member.model';

describe('BandsService', () => {
  let service: BandsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BandsService]
    });

    service = TestBed.get(BandsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('#getBands()', () => {
    afterEach(() => {
      httpMock.verify();
    });
    it('should retrieve Band[] by name from the API via GET', () => {
      const dummyBand: Band[] = [
        {
          band_id: 1,
          name: 'Metallica',
          image: 'http://image.jpg',
          about: 'About Metallica text',
          genres: 'Thrash Metal, Metal, Heavy Metal, Hard Rock, Rock'
        },
        {
          band_id: 4,
          name: 'Megadeth',
          image: 'http://image.jpg',
          about: 'About Megadeth text',
          genres: 'Thrash Metal, Metal, Heavy Metal, Speed Metal'
        }
      ];

      service.getBands('Me').subscribe(bands => {
        expect(bands.length).toBe(2);
        expect(bands).toEqual(dummyBand);
      });

      const req = httpMock.expectOne(`${service.API_URL}/bands-list/Me`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBand);
    });
  });

  describe('#getBand()', () => {
    afterEach(() => {
      httpMock.verify();
    });
    it('should retrieve AboutBand[] by band id from the API via GET', () => {
      const dummyAboutBand: AboutBand[] = [
        {
          band_id: 1,
          name: 'Metallica',
          about: 'About Metallica text',
          band_image: 'http://image1.jpg',
          album_name: 'Metallica',
          year: 1991,
          image: 'http://image.jpg',
          tracks: 12
        },
        {
          band_id: 1,
          name: 'Metallica',
          about: 'About Metallica text',
          band_image: 'http://image.jpg',
          album_name: '...And Justice for All',
          year: 1988,
          image: 'http://image2.jpg',
          tracks: 9
        }
      ];

      service.getBand(1).subscribe(band => {
        expect(band.length).toBe(2);
        expect(band).toEqual(dummyAboutBand);
      });

      const req = httpMock.expectOne(`${service.API_URL}/band/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyAboutBand);
    });
  });

  describe('#getMembers()', () => {
    afterEach(() => {
      httpMock.verify();
    });
    it('should retrieve Members[] by band id from the API via GET', () => {
      const dummyMembers: Member[] = [
        {
          member_id: 1,
          first_name: 'James',
          last_name: 'Hetfield',
          former: false,
          image: 'http://image.jpg',
          member_pos: 'lead vocals, rhythm guitar'
        },
        {
          member_id: 2,
          first_name: 'Ron',
          last_name: 'McGovney',
          former: true,
          image: 'http://image.jpg',
          member_pos: 'bass, backing vocals'
        }
      ];

      service.getMembers(1).subscribe(members => {
        expect(members.length).toBe(2);
        expect(members).toEqual(dummyMembers);
      });

      const req = httpMock.expectOne(`${service.API_URL}/members/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyMembers);
    });
  });

  describe('#getGallery()', () => {
    afterEach(() => {
      httpMock.verify();
    });
    it('should retrieve gallery by band id from the API via GET', () => {
      const dummyGallery: { image: string }[] = [{image: 'http://image1.jpg'}, {image: 'http://image1.jpg'}];

      service.getGallery(1).subscribe(gallery => {
        expect(gallery.length).toBe(2);
        expect(gallery).toEqual(dummyGallery);
      });

      const req = httpMock.expectOne(`${service.API_URL}/gallery/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyGallery);
    });
  });

  describe('#getByGenre()', () => {
    afterEach(() => {
      httpMock.verify();
    });
    it('should retrieve Band[] by genre from the API via GET', () => {
      const dummyBand: Band[] = [
        {
          band_id: 1,
          name: 'Metallica',
          image: 'http://image.jpg',
          about: 'About Metallica text',
          genres: 'Thrash Metal, Metal, Heavy Metal, Hard Rock, Rock'
        },
        {
          band_id: 4,
          name: 'Megadeth',
          image: 'http://image.jpg',
          about: 'About Megadeth text',
          genres: 'Thrash Metal, Metal, Heavy Metal, Speed Metal'
        }
      ];

      service.getByGenre('Metal').subscribe(bands => {
        expect(bands.length).toBe(2);
        expect(bands).toEqual(dummyBand);
      });

      const req = httpMock.expectOne(`${service.API_URL}/genre/Metal`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBand);
    });
  });

  describe('#getAllGenres()', () => {
    afterEach(() => {
      httpMock.verify();
    });
    it('should retrieve all genres from the API via GET', () => {
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

      service.getAllGenres().subscribe(genres => {
        expect(genres.length).toBe(2);
        expect(genres).toEqual(dummyAllGenres);
      });

      const req = httpMock.expectOne(`${service.API_URL}/all-genres`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyAllGenres);
    });
  });

  describe('#addNewBand()', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should post band data body to th API via POST', () => {

      const body = [{name: 'test'}];

      service.addNewBand(body).subscribe((band: any) => {
        expect(band.name).toBe('test');
      });

      const req = httpMock.expectOne(`${service.API_URL}/addNewBand`);
      expect(req.request.method).toBe('POST');
      req.flush({name: 'test'}, {status: 200, statusText: 'Ok'});
    });

  });
});
