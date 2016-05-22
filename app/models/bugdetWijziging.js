/**
 * Created by nadya on 19/05/2016.
 */
System.register([], function(exports_1) {
    var BudgetWijziging;
    return {
        setters:[],
        execute: function() {
            BudgetWijziging = (function () {
                function BudgetWijziging(id, beschrijving, bedrag) {
                    this.inspraakItemId = id;
                    this.beschrijving = beschrijving;
                    this.bedrag = bedrag;
                }
                return BudgetWijziging;
            })();
            exports_1("BudgetWijziging", BudgetWijziging);
        }
    }
});
//# sourceMappingURL=bugdetWijziging.js.map