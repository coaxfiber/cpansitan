var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../globalvars/globalvars';
var PropertyService = /** @class */ (function () {
    function PropertyService(http, global) {
        var _this = this;
        this.http = http;
        this.global = global;
        this.favoriteCounter = 0;
        this.favorites = [];
        this.http.get(this.global.site + 'api.php?action=get_app_list')
            .map(function (response) { return response.json(); })
            .subscribe(function (res) { return _this.properties = res; });
    }
    PropertyService.prototype.findAll = function () {
        return Promise.resolve(this.properties);
    };
    PropertyService.prototype.findById = function (id) {
        return Promise.resolve(this.properties[id - 1]);
    };
    PropertyService.prototype.findByName = function (searchKey) {
        var key = searchKey.toUpperCase();
        return Promise.resolve(this.properties.filter(function (property) {
            return (property.name + ' ' + property.address + property.specialty).toUpperCase().indexOf(key) > -1;
        }));
    };
    PropertyService.prototype.getFavorites = function () {
        return Promise.resolve(this.favorites);
    };
    PropertyService.prototype.favorite = function (property) {
        this.favoriteCounter = this.favoriteCounter + 1;
        this.favorites.push({ id: this.favoriteCounter, property: property });
        return Promise.resolve();
    };
    PropertyService.prototype.unfavorite = function (favorite) {
        var index = this.favorites.indexOf(favorite);
        if (index > -1) {
            this.favorites.splice(index, 1);
        }
        return Promise.resolve();
    };
    PropertyService.prototype.getproperties = function () {
        return Promise.resolve(this.properties);
    };
    PropertyService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, GlobalvarsProvider])
    ], PropertyService);
    return PropertyService;
}());
export { PropertyService };
//# sourceMappingURL=property-service-mock.js.map