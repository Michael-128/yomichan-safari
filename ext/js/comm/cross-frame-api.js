/*
 * Copyright (C) 2020-2022  Yomichan Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class CrossFrameAPI {
    constructor() {
        this._messageHandlers = new Map();
    }
    
    /*invoke(targetFrameId, action, params={}) {
        //return this.invokeTab(null, targetFrameId, action, params);
    }*/

    async invokeTab(targetTabId, targetFrameId, action, params={}) {
        chrome.runtime.sendMessage(params)
    }

    registerHandlers(messageHandlers) {
        for (const [key, value] of messageHandlers) {
            if (this._messageHandlers.has(key)) {
                throw new Error(`Handler ${key} is already registered`);
            }
            this._messageHandlers.set(key, value);
            chrome.runtime.onMessage.addListener(value.handler)
        }
    }

    unregisterHandler(key) {
        if(chrome.runtime.onMessage.hasListener(this._messageHandlers.get(key)))
            chrome.runtime.onMessage.removeListener(this._messageHandlers.get(key))
        return this._messageHandlers.delete(key);
    }
}
